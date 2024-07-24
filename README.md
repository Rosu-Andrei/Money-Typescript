# Money Application

#### This application was created using typescript. The main purpose of the
#### application is to model in a minimalistic way the representation of Money. To that end,
#### in this application, Money are considered only a combination of two fields: value and currency.

#### Apart from that, we consider as operations over money to be only addition, subtraction and splitting of the money.

## Business Logic

### The following logic can be done :
### 1. Transfer a given amount from an account (source) to another account (destination)
#### Rates for exchanges have been established so that if we want to transfer EUR let's say from the source account but that account only contains USD, then the application will convert the specific amount from EUR to USD so that extraction will take place.
### 2. Convert money from one currency to another currency.
#### Right now only two currencies are available for money, USD and EUR.
### 3. Invest money.
#### The most important part of the investment logic is the ability to calculate the profit you are going to have if you decide to invest a certain amount of money.
#### Inside the application you can choose the rate(%) and years for that investment. Keep in mind that the formula used was that of a compound interest rate.

## To run the application, you just have to type the following command in the command line:
    npm start