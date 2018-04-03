/*

   Author:Dylan Rich
   Date: 3/2/2018

   Filename: report.js



   Functions List:

   initPage()
      Initializes the contents of the Web page

   testLength()
      Tests a field for its length

   testPattern()
      Tests a field for its pattern

   validateForm
      Validates a Web form

   calcRow
      Calculates the costs within one row of the travel report

   calcTotal
      Calculates the total cost of the travel

   upDate
      Updates the total travel cost
*/

function initPage()
{
      var dataFields = [];
      var list = document.getElementsByClassName("expenseEntry");
      for(i=0 ; i<list.length; i++)
      {
            dataFields.push(list[i]);
      }
      for(j=0 ; j<dataFields.length; i++)
      {
            dataFields[i].addEventListener("blur", update);
      }
      var webForm = document.getElementById("expform");
      webForm.addEventListener("submit", validateForm);
}

function testLength(field)
{
      if(field.length == 0)
      {
            field.setAttribute("background-color", "yellow");
            return false;
      }
      else
      {
            field.setAttribute("background-color", "white");
            return true;
      }
}

function testPattern(field, regx)
{
      if(!(regx.test(field.getAttribute("value").value)))
      {
            field.setAttribute("background-color", "yellow");
            field.setAttribute("color", "red");
            return false;
      }
      else
      {
            field.setAttribute("background-color", "white");
            field.setAttribute("color", "black");
            return true;
      }
}

function validateForm()
{
      var isValid = true;
      isValid = testLength(document.forms[0].lname);
      isValid = testLength(document.forms[0].fname);
      isValid = testLength(document.forms[0].address);
      isValid = testLength(document.forms[0].summary);
      isValid = testPattern(document.forms[0].account, "/ACT\d\d\d\d\d\d/");
      isValid = testPattern(document.forms[0].department, "/DEPT\d\d\d/");
      isValid = testPattern(document.forms[0].project, "/PROJ\d\d\d\d\d/");
      isValid = (testPattern(document.forms[0].ssn, "\d\d\d\d\d\d\d\d\d") || testPattern(document.forms[0].ssn, "\d\d\d\-\d\d\-\d\d\d\d"));
      if(!isValid)
      {
            alert("Please fill out all required fields in the proper format");
      }
      return isValid;
}

function calcRow(row)
{
      var travel = parseFloat(document.forms[0].elements["travel"+row].value);
      var lodge = parseFloat(document.forms[0].elements["lodge"+row].value);
      var meal = parseFloat(document.forms[0].elements["meal"+row].value);
      return travel + lodge + meal;
}

function calcTotal()
{
      var totalExp = 0;
      for(i=1 ; i<5 ; i++)
      {
            totalExp += calcRow(i);
      }
      return totalExp;
}

function update()
{
      var numRegExp = "/^\d*(\.\d{0,2})?$/";
      if(numRegExp.test(this.value))
      {
            this.value = this.value.toFixed(2);
            for(i=1 ; i<5; i++)
            {
                  document.forms[0].elements["sub"+i].value = calcRow(i).toFixed(2);
            }
            document.forms[0].total.value = calcTotal().toFixed(2);
      }
      else
      {
            alert("Invalid currency value");
            this.value = 0.00;
            this.focus();
      }
}

window.onload = function(){initPage();}