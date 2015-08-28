

function fnGoToGraph() {
    var txtTNNumber = $("#txtTnNumber").val();
    var txtRepeatCount = $("#txtRepeatCount").val();
    var drpReason = $("#drpReason").val();

    var serviceURL = '/DataPredictive/getPredictData';

    $.ajax({
        type: "POST",
        url: serviceURL,
        data: param = "",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: successFunc,
        error: errorFunc
    });

    function successFunc(data, status) {
        alert(data);
    }

    function errorFunc() {
        alert('error');
    }
    fnLoadBaseGraph();
}

function fnLoadBaseGraph()
{
    // ************parameters **********
    var graphType = "column";

    // ************parameters **********



    var chart = new CanvasJS.Chart("chartContainer");

    chart.options.axisY = { suffix: "%" };
    //chart.options.title = { text: "WireLine Customer Survey" };
    chart.options.title = { text: "Mockup Survey" };
    chart.options.axisX = {
        title: "List of Reasons"
    };
    chart.options.axisY = {
        title: "Customers"
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
        toolTipContent: "{y} % of Customers comes under <a href = {name}> {label}</a>"

    };
    chart.options.data = [];
    chart.options.data.push(series1);
    //chart.options.data.push(series2);


    series1.dataPoints = [
            { label: "Disconnect", y: 18 },
            { label: "Service Issue", y: 29 },

    ];

    /*series2.dataPoints = [
        { label: "banana", y: 23 },
        { label: "orange", y: 33 },
        
    ];*/

    chart.render();

}



window.onload = function () {
    }
