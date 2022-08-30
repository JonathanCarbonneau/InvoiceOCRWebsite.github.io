[Author] Jonathan Carbonneau
[Last_Updated] 08/30/2022

## Description

- An online OCR invoice analyzer tool that can look at a
- Merchant Processing statement and provide a quick
- analysis on fees and margin for providing a competitive
- quote.

## Reference Tool

https://www.cardfellow.com/blog/credit-card-processing-guide/

## Use Case

- First Data Business Consultants prospect a high number
- of clients to switch them to First Data Merchant
- Processing services. A typical sales tool is to get a
- Processing statement from the Merchant and use that it
- to create a competitive bid. However, processing
- statements are sometimes complicated and that plus the
- sales reps knowledge makes analyzing these statements
- difficult.
- The online OCR tool will allow sales reps to
  1. Upload the statement
  2. Do a quick analysis
  3. Provide a summary of the Merchant Fees.

## Current Status

- A prototype of this Invoice Analyzer is available at:
  - [http://invoice.vivaspot.com/]
- It currently only works with a First Data Merchant
- Processor statement. By uploading a First Data Merchant
- Processor Statement and your email, the prototype will
- analyze the statement and send an analysis to the email
- address.

## Problem Analysis

- A typical merchant processor statement is complex. There
- are six main procesors:
  - FIServ
  - Heartland
  - Elevon
  - TSYS
  - Global Processing
  - FIS
- Each processor services numerous banks, Independent
- Sales Organizations (ISO’s) and agents. Each Processor
- provides a unique processor invoice that each Bank, ISO
- and agent uses. Thus, the Invoice from FiServ and its
- banks, will be different in format from Heartland and
- its associated banks.

## Information on Statements

- Each statement provides summary and detailed analysis of
- each credit card and debit card transaction with the
- associated fees. These include:
  1. Assessment Fees - These are fees paid to card brands such as Visa, Mastercard, American Express and Discover. These companies manage the networks that enable the credit/debit charges to route to the Credit Card Issuer. These fees are non-negotiable.
  2. Interchange Fees - These are fees charged by the Credit Card Issuer (e.g. Bank of America Credit Card). The put the plastic into the hands of the consumer. A typical interchange fee is a percentage of the credit card swipe, plus a flat fee. Things like card type (credit or debit), card category (reward, commercial, etc.), and processing method (swiped / keyed) dictate the final Interchange rate. These fees are also non-negotiable.
  3. Processor Markup - The markup is where processors, gateway providers, sales agents, etc. make money, and the markup is the only area of cost that varies among processors.
- [Example] A business processes $10,000 in credit card 
    transactions in a month and is charged $325 in   fees from its processor. Thus the effective rate is .325% or 325 basis points. Thus  
        -$X (assessment fees) + $Y (Interchange fees) + $Z (Processor Markup) = $325

## Solution

By analyzing the invoice and determine the assessment fees and determining the Interchange fees and by knowing the total fees, you can deduce the processor markup. By determining the processor markup and making that know to the First Data Business Consultant, we have provided a key data point in helping them negotiate a new contract with the Merchant.

## IDEs

1. Install [Visual Studio Code](https://code.visualstudio.com/)
2. Install [SSMS](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16)
   - Useful to troubleshoot queries in SSMS as opposed to in VS Code
