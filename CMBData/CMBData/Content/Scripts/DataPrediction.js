
var drpChartType = "Default";
function fnGoToGraph() {
    //debugger;
    var txtTNNumber = $("#txtTnNumber").val();
    var txtRepeatCount = $("#txtRepeatCount").val();
    var drpReason = $("#drpReason").val();
    drpChartType = $('#drpChartType').val();
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
    //debugger;
    var graphType = drpChartType == "Default" ? "column" : drpChartType.toLowerCase();

    // ************parameters **********
    $('#chartContainer_0')[0].innerHtml = "";
    $('#chartContainer_1')[0].innerHtml = "";;
    $('#chartContainer_0').find("canvas").height(0);
    $('#chartContainer_1').find("canvas").height(0);
    $('#chartContainer_0').find("canvas").width(0);
    $('#chartContainer_1').find("canvas").width(0);
    $("div").remove(".canvasjs-chart-toolbar");
    
    if (data && data.lstPrdic)
    {
        var titleXAxis = "Loyalty";
        var titleYAxis = "Eligibllity in %";
        var toolTipText = "{y} % <a href = {name}> {label}</a>";
        var chartWidth = 150;
        if(data.lstPrdic.length > 0)
        {

            for (var counter = 0; counter < data.lstPrdic.length; counter++)
            {
                //toolTipText = toolTipText + (parseInt(data.lstPrdic[counter].YesPercentage) - 17 )+ " $";
                var chart = new CanvasJS.Chart("chartContainer_" + counter);
                
                chart.options.axisY = { suffix: "" };
                //chart.options.title = { text: "WireLine Customer Survey" };
                //debugger;
                chart.options.title = { text: data.lstPrdic[counter].DisconnectReason };
                chart.options.axisX = {
                    title: titleXAxis
                };
                chart.options.axisY = {
                    title: titleYAxis
                };
                chart.width = {
                    width: chartWidth,
                };
                
                chart.options.exportEnabled = { enabled: true };
                //chart.options.zoomEnabled = { enabled: true };
                chart.options.animationEnabled = { enabled: true };

                var series1 = { //dataSeries - first quarter
                    type: graphType,
                    name: "",
                    //color: "red",
                    showInLegend: true,
                    animationEnabled: true,
                    toolTipContent: toolTipText

                };
                chart.options.data = [];
                chart.options.data.push(series1);
                //chart.options.data.push(series2);


                series1.dataPoints = [
                        { label: "Eligible to use loyalty", y: data.lstPrdic[counter].YesPercentage },
                        { label: "not Eligible to use loyalty", y: data.lstPrdic[counter].NoPercentage },

                ];

                /*series2.dataPoints = [
                    { label: "banana", y: 23 },
                    { label: "orange", y: 33 },
                    
                ];*/

                chart.render();
            }
             
        }
    }

  //fnDisplaySccondSet(data);

}

function fnDisplaySccondSet(data) {
    // Second set of graph
    var graphType = drpChartType == "Default" ? "column" : drpChartType.toLowerCase();
    var titleXAxis = "Loyalty";
    var titleYAxis = "Eligibllity in %";
    var toolTipText = "{y} % Eligible to <a href = {name}> {label}</a>";
    var chartWidth = 150;

    for (var counter = 0; counter < data.lstPrdic.length; counter++) {
        var chartId = counter == 0 ? 2 : chartId+counter;
        var chart = new CanvasJS.Chart("chartContainer_" + chartId);

        chart.options.axisY = { suffix: "" };
        
        chart.options.title = { text: data.lstPrdic[counter].DisconnectReason };
        chart.options.axisX = {
            title: titleXAxis
        };
        chart.options.axisY = {
            title: titleYAxis
        };
        chart.width = {
            width: chartWidth,
        };

        chart.options.exportEnabled = { enabled: true };
        chart.options.animationEnabled = { enabled: true };

        var series1 = { //dataSeries - first quarter
            type: graphType,
            name: "",
            //color: "red",
            showInLegend: true,
            animationEnabled: true,
            toolTipContent: toolTipText

        };
        chart.options.data = [];
        chart.options.data.push(series1);

        //debugger;
        series1.dataPoints = [
                { label: "Repeat Count", y: data.lstPrdic[counter].strRepeatCount },
                { label: "Repeat Count1", y: data.lstPrdic[counter].strRepeatCount },

        ];

        chart.render();
    }
}




window.onload = function () {
}
