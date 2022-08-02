import { Component, OnInit } from "@angular/core";
import { FileUploadService } from "./file-upload.service";
import { Sort } from "@angular/material/sort";
import { ChartType } from "chart.js";
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
  selector: "app-file-upload",
  templateUrl: "upload.component.html",
  styleUrls: ["../shared/card.css"],
})
export class UploadComponent implements OnInit {
  //Inital blank data
  data = {
    Adjustments: ["", "0.00"],
    Average_Ticket: "0.00",
    Chargebacks_Reversals: "0.00",
    Effective_Rate: "0.00",
    Fees: ["-", "0.00"],
    Merchant_Number: "0000000000000",
    Processing_Fee: "0",
    Processing_Percent: "0",
    SUMMARY_BY_DAY: [
      {
        Adjustments: "0.00",
        Amount_Processed: "$0.00",
        Chargebacks_Reversals: "0.00",
        Date_Submitted: "00/00/00",
        Fees: "0.00",
        Submitted_Amount: "$0.00",
      },
    ],
    Statement_Period_end: "00/00/00",
    Statement_Period_start: "00/00/00",
    TOTAL_ACCOUNT_FEES: [
      {
        ACCOUNT: "Fee",
        Amount: "-$0.00",
        Type: "Fees",
      },
    ],
    TRANSACTION_FEES: [
      {
        Amount: "-$0.00",
        TRANSACTION_FEES: "Fee",
        Type: "Fees",
      },
    ],
    Total_Amount_Submitted: "0.00",
    Total_Fees: ["-", "0.00"],
    Total_Interchange_Charges: ["-", "0.00"],
    Total_Service_Charges: ["-", "0.00"],
    amount: 0.0,
    currency: "USD",
    date: "00:00:00",
    desc: "Invoice from YOUR CARD PROCESSING STATEMENT",
    invoice_number: "000000000000",
    issuer: [],
  };
  //converts the curency stings to numbers.
  private convertToNumber(amount: string): number {
    return(Number(amount.replace(/[^0-9.-]+/g, "")))
  }
  //defining all the varables to be used
  sortedDataTransactionFees = this.data.TRANSACTION_FEES.slice();
  sortedDataAccountFees = this.data.TOTAL_ACCOUNT_FEES.slice();
  sortedSummaryByDay = this.data.SUMMARY_BY_DAY.slice();
  errorMessage = "";
  title: string = "Upload";
  filePath: string = "../assets/invoice.pdf";
  show: boolean = false;
  // Variable to store shortLink from api response
  shortLink: string = "";
  file: any = null; // Variable to store file
  // Inject service
  dateSubmitted: string[] = [];
  amountProcessed: number[] = [];
  adjustments: number[] = [];
  chargebacksReversals: number[] = [];
  fees: number[] = [];
  submittedAmount: number[] = [];
  feeData: number[] = [0, 0, 0];
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  //init the charts.
  public barChartLabels = this.dateSubmitted;
  public barChartType: ChartType = "bar";
  public barChartLegend = true;
  public barChartData = [{ data: this.submittedAmount, label: "Series A" }];
  public pieChartData: any;
  public pieChartFees: any;
  public pieChartDataAccount: any;

  public pieChartType: ChartType = "pie";
  pieChartLabels: any;
  pieData: any;
  pieChartDataFees: number[] = [0, 0, 0];
  pieChartDataAccountFees: number[] = [0, 0, 0];

  constructor(private fileUploadService: FileUploadService) {}

  ngOnInit(): void {}

  onChange(event: any) {
    this.file = event.target.files[0];
  }
//reset all the data in the carts upon new upload.
  resetCharts(): void {
    this.dateSubmitted = [];
    this.barChartData = [{ data: [], label: "Series A" }];
    this.feeData[0] = 0;
    this.feeData[1] = 0;
    this.feeData[2] = 0;
    this.pieChartDataFees[0] = 0;
    this.pieChartDataFees[1] = 0;
    this.pieChartDataFees[2] = 0;
    this.pieChartDataAccountFees[0] = 0;
    this.pieChartDataAccountFees[1] = 0;
    this.pieChartDataAccountFees[2] = 0;
  }
//starts the charts populates with new data.
activateCharts(): void {
  // the allows the data to be sorted when the row hedder is clicked
  this.sortedDataTransactionFees.forEach((y) => {
    switch (y.Type) {
      case "Fees":
        this.pieChartDataFees[0] += this.convertToNumber(
          y.Amount
        );
        break;
      case "Interchange charges":
        this.pieChartDataFees[1] += this.convertToNumber(
          y.Amount
        );
        break;
      case "Service charges":
        this.pieChartDataFees[2] += this.convertToNumber(
          y.Amount
        );
        break;
      default:
        console.log("No such day exists!");
        break;
    }
  });
  this.sortedDataAccountFees.forEach((y) => {
    switch (y.Type) {
      case "Fees":
        this.pieChartDataAccountFees[0] += this.convertToNumber(
          y.Amount
        );
        break;
      case "Interchange charges":
        this.pieChartDataAccountFees[1] += this.convertToNumber(
          y.Amount
        );
        break;
      case "Service charges":
        this.pieChartDataAccountFees[2] += this.convertToNumber(
          y.Amount
        );
        break;
    }
  });
//init the data for the piechart.
  this.pieChartData = {
    labels: ["Fees", "Interchange charges", "Service charges"],
    datasets: [
      {
        label: "My First Dataset",
        data: this.pieChartDataFees,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

   this.pieChartFees = {
    labels: ["Fees", "Interchange charges", "Service charges"],
    datasets: [
      {
        label: "My First Dataset",
        data: this.feeData,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

   this.pieChartDataAccount = {
    labels: ["Fees", "Interchange charges", "Service charges"],
    datasets: [
      {
        label: "My First Dataset",
        data: this.pieChartDataAccountFees,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  this.barChartLabels = this.dateSubmitted;
  this.barChartData = [
    { data: this.amountProcessed, label: "Amount Processed" },
  ];
}
activateSorting() {
        //slicing the data for the charts.
        this.sortedDataTransactionFees = this.data.TRANSACTION_FEES.slice();
        this.sortedDataAccountFees = this.data.TOTAL_ACCOUNT_FEES.slice();
        this.sortedSummaryByDay = this.data.SUMMARY_BY_DAY.slice();
        //filter the string data to be numeric
        this.feeData[0] += Number(-this.data.Total_Fees[1]);
        this.feeData[1] += Number(-this.data.Total_Interchange_Charges[1]);
        this.feeData[2] += Number(-this.data.Total_Service_Charges[1]);
        //get filter all data to numeric data
        this.sortedSummaryByDay.forEach((y) => {
          if (y.Date_Submitted.match(/^(\d{1,2})\/(\d{1,2})\/(\d{1,2})$/)) {
            this.dateSubmitted.push(y.Date_Submitted);
            this.amountProcessed.push(this.convertToNumber(y.Amount_Processed)
            );
            this.adjustments.push(this.convertToNumber(y.Adjustments)
            );
            this.chargebacksReversals.push(this.convertToNumber(y.Chargebacks_Reversals)
            ); 
            this.fees.push(this.convertToNumber(y.Fees));
            this.submittedAmount.push(this.convertToNumber(y.Submitted_Amount)
            );
          }
        });
}
 //function is called when the submit button is pressed.
  onUpload() {
    console.log(this.file);
    if(this.file != null){
      this.errorMessage = "Your file has been submited!";
    }else{
      this.errorMessage = "You have not chosen a file";
    }
    //writes the data to the chart this is automaticly updated.
    this.fileUploadService.upload(this.file).subscribe({
      next: (data) => {
        this.data = data;
        this.resetCharts();
        this.activateSorting();
        this.activateCharts();
      },
      error: (error) => {
        this.errorMessage = String(error.error.message);
      },
    });
 
  }

//the sorting algorithem for sorting the columbs when clicked.
  
//sorts TransactionFees data when the chart hedders are clicked 
  sortDataTransactionFees(sort: Sort) {
    const data = this.data.TRANSACTION_FEES.slice();
    if (!sort.active || sort.direction === "") {
      this.sortedDataTransactionFees = data;
      return;
    }

    this.sortedDataTransactionFees = data.sort((a, b) => {
      const isAsc = sort.direction === "asc";
      switch (sort.active) {
        case "Amount":
          return compare(this.convertToNumber(a.Amount), this.convertToNumber(b.Amount), isAsc);
        case "TRANSACTION_FEES":
          return compare(a.TRANSACTION_FEES, b.TRANSACTION_FEES, isAsc);
        case "Type":
          return compare(a.Type, b.Type, isAsc);
        default:
          return 0;
      }
    });
  }
//sorts AccountFees data when the chart hedders are clicked 
  sortDataAccountFees(sort: Sort) {
    const data = this.data.TOTAL_ACCOUNT_FEES.slice();
    if (!sort.active || sort.direction === "") {
      this.sortedDataAccountFees = data;
      return;
    }

    this.sortedDataAccountFees = data.sort((a, b) => {
      const isAsc = sort.direction === "asc";
      switch (sort.active) {
        case "ACCOUNT":
          return compare(a.ACCOUNT, b.ACCOUNT, isAsc);
        case "Amount":
          return compare(this.convertToNumber(a.Amount), this.convertToNumber(b.Amount), isAsc);
        case "Type":
          return compare(a.Type, b.Type, isAsc);
        default:
          return 0;
      }
    });
  }
  //sorts DataSummaryByDay data when the chart hedders are clicked 
  sortDataSummaryByDay(sort: Sort) {
    const data = this.data.SUMMARY_BY_DAY.slice();
    if (!sort.active || sort.direction === "") {
      this.sortedSummaryByDay = data;
      return;
    }
//all stings must be converted hence convert to number.
    this.sortedSummaryByDay = data.sort((a, b) => {
      const isAsc = sort.direction === "asc";
      switch (sort.active) {
        case "Adjustments":
          return compare(this.convertToNumber(a.Adjustments), this.convertToNumber(b.Adjustments), isAsc);
        case "Amount_Processed":
          return compare(this.convertToNumber(a.Amount_Processed), this.convertToNumber(b.Amount_Processed), isAsc);
        case "Chargebacks_Reversals":
          return compare(this.convertToNumber(a.Chargebacks_Reversals), this.convertToNumber(b.Chargebacks_Reversals), isAsc);
        case "Amount_Processed":
          return compare(this.convertToNumber(a.Amount_Processed), this.convertToNumber(b.Amount_Processed), isAsc);
        case "Date_Submitted":
          return compare(a.Date_Submitted, b.Date_Submitted, isAsc);
        case "Fees":
          return compare(this.convertToNumber(a.Fees), this.convertToNumber(b.Fees), isAsc);
        case "Submitted_Amount":
          return compare(this.convertToNumber(a.Submitted_Amount), this.convertToNumber(b.Submitted_Amount), isAsc);
        default:
          return 0;
      }
    });
  }
}
//function for comparing.
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
