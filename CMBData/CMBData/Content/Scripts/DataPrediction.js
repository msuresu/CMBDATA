

$(function () {

});

function DrawPieChart(htmlId, headerText, jsonData) {
    var chart1 = "";
    chart1 = new Highcharts.Chart({
        chart: {
            renderTo: htmlId,

            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: headerText,
            style: {
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || '#333333',
                fontFamily: '\'Lato\', sans-serif', lineHeight: '18px', fontSize: '15px', fontWeghit: 'bold'
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y:.1f}%</b> ({point.timespent} Mins)'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                        fontFamily: '\'Lato\', sans-serif', lineHeight: '18px', fontSize: '11px'
                    }
                },
                point: {
                    events: {
                        click: function (e) {
                            
                            var DesktopAnalyticsScope = angular.element($('#DesktopAnalytics-container')).scope();
                            var date = "";
                            if (DesktopAnalyticsScope && DesktopAnalyticsScope.DisplayHeaderType != "Week") {
                                date = DesktopAnalyticsScope.ShowUsageDataForDate(DesktopAnalyticsScope.HeaderDisplayDate);
                                dispDate = this.value;
                            }
                            if (!date) {
                                date = "";
                            }
                            if (DesktopAnalyticsScope.SelectedAgent && htmlId == "piechart2") {
                                $.ajax({
                                    type: "POST",
                                    url: GetCallDetails,
                                    async: false,
                                    data: "{ 'AgentID':'" + DesktopAnalyticsScope.SelectedAgent + "','DisplayDate':'" + date + "'}",
                                    contentType: 'application/json; charset=utf-8',
                                    dataType: "json",
                                    success: function (Res) {

                                        DesktopAnalyticsScope.BindCallDetailsData(Res);
                                    },
                                    error: function (jqXHR, textStatus, errorThrown) {

                                }
                                });
                            }
                        }
                    }
                }
            }
        },
        series: [{

            name: "Applications",
            colorByPoint: true,
            data: jsonData
        }],
        exporting: {
            buttons: {
                contextButton: {
                    enabled: false
                }
            }
        }
    });
}


var drpChartType = "Default";
var graphType = drpChartType == "Default" ? "column" : drpChartType.toLowerCase();
function fnGoToGraph() {
    //debugger;
    var txtTNNumber = $("#txtTnNumber").val();
    var txtRepeatCount = $("#txtRepeatCount").val();
    var drpReason = $("#drpReason").val();
    drpChartType = $('#drpChartType').val();
    graphType = drpChartType == "Default" ? "column" : drpChartType.toLowerCase();
    if (drpReason == "All") {
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
        var options = txtRepeatCount >= 0 ? { "TNNumber": txtTNNumber } : { "TNNumber": null }
        fnLoadBaseGraph(data, options);
    }

    function errorFunc() {
        alert('error');
    }

}

function fnLoadBaseGraph(data, options) {
    // ************parameters **********
    //debugger;

    var searchOptions = options;
    // ************parameters **********
    $('[id^=chartContainer_]').find("canvas").height(0).width(0);
    //$('#chartContainer_0').find("canvas").height(0);
    //$('#chartContainer_1').find("canvas").height(0);
    //$('#chartContainer_0').find("canvas").width(0);
    //$('#chartContainer_1').find("canvas").width(0);
    $("div").remove(".canvasjs-chart-toolbar");

    fnDisplayFirstSet(data);
    if (searchOptions.TNNumber != null && searchOptions.TNNumber > 0) {
        fnDisplaySecondSet(data);
    }


}

function fnDisplayFirstSet(data) {
    if (data && data.lstPrdic && data.lstPrdic.length > 0) {
        var titleXAxis = "Loyalty";
        var titleYAxis = "Probability in %";
        var toolTipText = "{y} % <a href = {name}> {label}</a>";
        var chartWidth = 150;
        for (var counter = 0; counter < data.lstPrdic.length; counter++) {
            if (data.lstPrdic[counter] != null) {
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
                        { label: "Probability to use loyalty", y: data.lstPrdic[counter].YesPercentage },
                        { label: "Probability for not to use loyalty", y: data.lstPrdic[counter].NoPercentage },

                ];

                /*series2.dataPoints = [
                    { label: "banana", y: 23 },
                    { label: "orange", y: 33 },
                    
                ];*/

                chart.render();
            }
            else {
                fnShowMessage("1");
            }

        }
    }
    else {
        fnShowMessage("1");
    }

}

function fnDisplaySecondSet(data) {
    // Second set of graph
  
    if (data && data.lstPrdic != null && data.lstPrdic.length > 0) {
        var titleXAxis = "";
        var titleYAxis = "";
        var toolTipText = "Count {y} for <a href = {name}> {label}</a>";
        var chartWidth = 150;

        for (var counter = 0; counter < data.lstPrdic.length; counter++) {
            if (data.lstPrdic[counter] != null) {
                var chartId = counter == 0 ? 2 : chartId + counter;
                var chart = new CanvasJS.Chart("chartContainer_" + chartId);

                chart.options.axisY = { suffix: "" };

                chart.options.title = { text: "" };
                chart.options.axisX = {
                    title: titleXAxis
                };
                chart.options.axisY = {
                    title: data.lstPrdic[counter].TNnumber
                };
                chart.width = {
                    width: chartWidth,
                };

                chart.options.exportEnabled = { enabled: true };
                chart.options.animationEnabled = { enabled: true };

                var series1 = { //dataSeries - first quarter
                    type: "bar",
                    name: "",
                    //color: "red",                        
                    showInLegend: true,
                    animationEnabled: true,
                    toolTipContent: toolTipText,
                   
                };
                chart.options.data = [];
                chart.options.data.push(series1);


                //series1.dataPoints = [

                //     { x: 10000, y: 1100 },
                //     { x: 11000, y: 1200 },
                //     { x: 48500, y: 8200 }
                //];
              
                series1.dataPoints = [
                        { y: data.lstPrdic[counter].RepeatCount, label: "Repeat Count" },
                        //{ y: data.lstPrdic[counter].RepeatCount + 12, label: "2" },
                        //{ y: data.lstPrdic[counter].RepeatCount+ 15, label: ">=3" },
        

                ];

                chart.render();
            }
            else {
                fnShowMessage("1");
            }
        }
    }
    else {
        fnShowMessage("1");
    }
}

function fnShowMessage(message) {
    var displayText = message == "1" ? "There is no matahced records for your search" : message;
    //$("#divDisplayMessage").dialog();
    alert(displayText);
    //$("#divDisplayMessage").dialog({
    //    modal: true,
    //    buttons: {
    //        Ok: function () {
    //            $(this).dialog("close");
    //        }
    //    }
    //});
}
window.onload = function () {
}
