

function fnGoToGraph() {
    debugger;
    var txtTNNumber = $("#txtTnNumber").val();
    var txtRepeatCount = $("#txtRepeatCount").val();
    var drpReason = $("#drpReason").val();
    if (drpReason == "All")
    {
        drpReason = "";
    }
    var serviceURL = '/DataPrdictive/getPredictData';
    var param = { strTN: txtTNNumber, strRepeatCount: txtRepeatCount, strReason: drpReason };
    $.ajax({
        type: "POST",
        url: serviceURL,
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: successFunc,
        error: errorFunc
    });

    function successFunc(data, status) {
        fnLoadBaseGraph(data);
    }

    function errorFunc() {
        alert('error');
    }
    
}

function fnLoadBaseGraph(data)
{
    // ************parameters **********
    var graphType = "column";

    // ************parameters **********
    $('#chartContainer_0')[0].innerHtml = "";
    $('#chartContainer_1')[0].innerHtml = "";;
    $('#chartContainer_0').find("canvas").height(0);
    $('#chartContainer_1').find("canvas").height(0);
    $('#chartContainer_0').find("canvas").width(0);
    $('#chartContainer_1').find("canvas").width(0);

    if (data && data.lstPrdic)
    {
        if(data.lstPrdic.length > 0)
        {
            
            for (var counter = 0; counter < data.lstPrdic.length; counter++)
            {
                var chart = new CanvasJS.Chart("chartContainer_" + counter);
                
                chart.options.axisY = { suffix: "%" };
                //chart.options.title = { text: "WireLine Customer Survey" };
                debugger;
                chart.options.title = { text: data.lstPrdic[counter].DisconnectReason };
                chart.options.axisX = {
                    title: "Loyalty"
                };
                chart.options.axisY = {
                    title: "Eligible %"
                };
                chart.options.exportEnabled = { enabled: true };
                chart.options.zoomEnabled = { enabled: true };
                chart.options.animationEnabled = { enabled: true };

                var series1 = { //dataSeries - first quarter
                    type: graphType,
                    name: "",
                    //color: "red",
                    showInLegend: true,
                    animationEnabled: true,
                    toolTipContent: "{y} % of Customers are Eligible for <a href = {name}> {label}</a> of 25$"

                };
                chart.options.data = [];
                chart.options.data.push(series1);
                //chart.options.data.push(series2);


                series1.dataPoints = [
                        { label: "Loyalty Eligible", y: data.lstPrdic[counter].YesPercentage },
                        { label: "Loyalty Non Eligible", y: data.lstPrdic[counter].NoPercentage },

                ];

                /*series2.dataPoints = [
                    { label: "banana", y: 23 },
                    { label: "orange", y: 33 },
                    
                ];*/

                chart.render();
            }
            
        }
    }


   

   

}



window.onload = function () {
    }
