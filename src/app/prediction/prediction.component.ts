import { Component, OnInit } from "@angular/core";
import { Papa } from "ngx-papaparse";
import { PredictService } from "../apis/predict.service";
import { Message, SortEvent } from "primeng/components/common/api";

@Component({
  selector: "app-prediction",
  templateUrl: "./prediction.component.html",
  styleUrls: ["./prediction.component.scss"]
})
export class predictionComponent implements OnInit {
  fileToUpload: File = null;
  showWarning: boolean = false;
  isLoading: boolean = false;
  isFileLoading: boolean = false;
  errorMessage: string = "";
  isUploadView: boolean = false;
  showPredictView: boolean = false;
  predictionDetailsLoading: boolean = false;
  showSuccessIcon: boolean = false;
  showErrorIcon: boolean = false;
  tabIndex: number = 0;
  predResult: any[];
  cols: any[];
  resCols: any[];
  inputList: any[];
  predictionResultList: any[];
  timer: number = 3000;
  msgs: Message[] = [];
  frozenCols: any[];
  failureBucketList: any[];
  inputListClone: any[];
  enablePredictionButton: boolean = false;
  selectedMilesToFail: string = "";

  constructor(private papa: Papa, private predictService: PredictService) {}

  ngOnInit() {
    this.onloadData();
  }

  closeWarningModal() {
    this.showWarning = false;
  }

  /**
   * onload details
   */
  onloadData = () => {
    this.cols = [{ field: "index", header: "", width: "40px" }];
    // Result columns
    this.resCols = [
      { field: "index", header: "", width: "40px" },
      { field: "VIN", header: "VIN" },
      {
        field: "PREDICTION_1",
        header: "PREDICTION_1"
      },
      {
        field: "PREDICTION_PROBABILITY_1",
        header: "PREDICTION_PROBABILITY (%)"
      }
    ];
    this.getLatestPredictionDetails();
  };

  /**
   * Handle file upload ::
   * @param files
   */
  handleFileInput(files: FileList) {
    this.fileToUpload = null;
    this.isFileLoading = true;
    this.validateFile(event);
  }

  /**
   * validate uploaded file
   * @param event
   */
  validateFile(event: any) {
    const file: File = event.target.files.item(0);
    const fileExtention = file.name
      .split(".")
      .pop()
      .toLowerCase();
    if (fileExtention === "csv") {
      if (file.name.length > 45) {
        event.target.value = "";
        this.msgs = [];
        this.msgs.push({
          severity: "error",
          summary: "Error Message",
          detail:
            "The uploaded file name is too long, allowed maximum 45 characters"
        });
        this.isFileLoading = false;
      } else {
        const fileReader = new FileReader();
        fileReader.readAsText(file, "UTF-8");
        fileReader.onload = (fileLoadedEvent: any) => {
          const csv: any = fileReader.result;
          let validFlag = true;
          const results = this.papa.parse(csv as string, {
            header: true,
            skipEmptyLines: true,
            complete: results => {
              console.log(results.data);
            }
          });
          if (
            results !== null &&
            results !== undefined &&
            results.data !== null &&
            results.data !== undefined &&
            results.data.length > 0 &&
            results.errors.length === 0
          ) {
            results.meta.fields.forEach(column => {
              this.cols.push({
                field: column,
                header: column,
                width:
                  column === "UNIT_MAKE_CODE" ||
                  column === "UNIT_MODEL_YEAR" ||
                  column === "MILEAGE" ||
                  column === "UNIT_ENGINE_EPA_YEAR"
                    ? "180px"
                    : column === "FAULT_CODES"
                    ? "200px"
                    : "110px"
              });

              // dummy column for export
              if (column !== "VIN") {
                this.resCols.push({
                  field: column,
                  header: column,
                  display: "none"
                });
              }
            });
          } else {
            this.msgs = [];
            validFlag = false;
            this.msgs = [];
            this.msgs.push({
              severity: "error",
              summary: "Error Message",
              detail: "Unable to load selected csv file , please check again"
            });
          }
          // check for valid csv file
          if (validFlag) {
            let allTextLines = csv.split(/\r|\n|\r/);
            const cammaRegEx = /[^,]+/g;
            allTextLines = allTextLines.filter(
              line => cammaRegEx.exec(line) && line.length > 0
            );
            if (allTextLines.length > 1) {
              if (allTextLines.length <= 2001) {
                this.fileToUpload = file;
                this.isFileLoading = false;
                this.uploadCSV();
              } else {
                event.target.value = "";
                this.msgs = [];
                this.msgs.push({
                  severity: "error",
                  summary: "Error Message",
                  detail:
                    "The uploaded file has more than 2000 rows, please upload a file with less data"
                });
                this.isFileLoading = false;
              }
            } else {
              event.target.value = "";
              this.msgs = [];
              this.msgs.push({
                severity: "error",
                summary: "Error Message",
                detail:
                  "There is no data in the uploaded file, Please upload a valid file"
              });
              this.isFileLoading = false;
            }
          }
        };
      }
    } else {
      event.target.value = "";
      this.msgs = [];
      this.msgs.push({
        severity: "error",
        summary: "Error Message",
        detail: "Invalid file, Please upload a valid .csv file "
      });
      this.isFileLoading = false;
    }
  }

  /**
   * upload csv file for prediction
   */
  uploadCSV = () => {
    this.isLoading = true;
    this.msgs = [];
    this.predictService.uploadPredictFile(this.fileToUpload).subscribe(
      response => {
        if (response["error_data"].length < 1) {
          this.inputList = response.data;
          this.predictionResultList = [];
          this.inputList.forEach((item, index) => {
            item.index = index + 1;
          });
          this.msgs.push({
            severity: "success",
            summary: "Info Message",
            detail: "Successfully uploaded CSV datails "
          });
          this.showSuccessIcon = true;
          this.enablePredictionButton = true;
          this.tabIndex = 0;
        } else {
          this.msgs = [];
          this.showErrorIcon = true;
          this.msgs.push({
            severity: "error",
            summary: "Error Message",
            detail: "Please check these Errors:: " + response["error_data"]
          });
        }
      },
      error => {
        this.msgs.push({
          severity: "error",
          summary: "Error Message: ",
          detail: error
        });
        this.showErrorIcon = true;
      }
    );
    this.isLoading = false;
  };
  /**
   * disable upload button
   */
  disableUploadButton() {
    return (
      this.fileToUpload === null ||
      this.fileToUpload.name === undefined ||
      this.fileToUpload.name.length <= 0 ||
      this.isFileLoading
    );
  }

  /**
   * get prediction details
   */
  getInputDetails = () => {
    this.predictService.getPredictionDetails().subscribe(
      (response: Array<any>) => {
        this.inputList = response;
        setTimeout(() => {
          this.predictionDetailsLoading = false;
        }, 3000);
      },
      error => {
        this.msgs.push({
          severity: "error",
          summary: "Error Message",
          detail: "Unable to get prediction details "
        });
        this.predictionDetailsLoading = false;
      }
    );
  };

  /**
   * get prediction result details
   */
  getPredResultDetails = () => {
    this.msgs = [];
    let columns: Array<String> = [];
    let colObj = {};
    // this.predictService.uploadPredicResultFile(this.fileToUpload).subscribe(
    this.predictService.getPredictionResultDetails().subscribe(
      (response: any) => {
        var responseJSON = JSON.parse(response);
        this.predictionResultList = responseJSON;
        console.log(responseJSON);
        this.failureBucketList = [];
        this.failureBucketList.push({
          label: "All",
          value: null
        });
        this.predictionResultList.forEach((item, index) => {
          if (item.PREDICTION_1) {
            this.failureBucketList.push({
              label: item.PREDICTION_1,
              value: item.PREDICTION_1
            });
            this.inputList.forEach(res => {
              if (res.VIN === item.VIN) {
                res.PREDICTION_1 = item.PREDICTION_1;
              }
            });
          }
          item.index = index + 1;
        });
        this.failureBucketList = this.failureBucketList.filter(
          (thing, index) => {
            const _thing = JSON.stringify(thing);
            return (
              index ===
              this.failureBucketList.findIndex(obj => {
                return JSON.stringify(obj) === _thing;
              })
            );
          }
        );
        this.predictionDetailsLoading = false;
        this.tabIndex = 1;
        this.enablePredictionButton = false;
        this.msgs.push({
          severity: "success",
          summary: "Info Message",
          detail: "Prediction results are available for review "
        });
      },
      error => {
        this.msgs.push({
          severity: "error",
          summary: "Error Message",
          detail: "Unable to get prediction result details " + error
        });
        this.predictionDetailsLoading = false;
      }
    );
  };

  /**
   * handle tab change
   * @param e
   */
  handleChange(e) {
    this.tabIndex = e.index;
  }
  /**
   * hide upload view
   */
  hideUploadView() {
    this.fileToUpload = null;
    this.isUploadView = !this.isUploadView;
  }

  /**
   * predict details ....
   */
  predictDetails() {
    this.showPredictView = true;
    this.predictionDetailsLoading = true;
    this.getPredResultDetails();
  }

  /**
   * show latest prediction details
   */
  getLatestPredictionDetails = () => {
    //this.showPredictView = true;
    // this.getInputDetails();
    // this.getPredResultDetails();
    //this.predictionDetailsLoading = true;
    // this.getUserIP(function(ip) {
    //   localStorage.setItem("ip", ip);
    // });
  };
}
