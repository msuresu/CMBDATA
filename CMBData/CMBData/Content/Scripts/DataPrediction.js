

function fnGoToGraph() {
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
   
    if (data && data.lstPrdic)
    {
        if(data.lstPrdic.length > 0)
        {
            
            for (i = 0; i < data.lstPrdic.length; i++)
            {
                var chart = new CanvasJS.Chart("chartContainer");
                
                chart.options.axisY = { suffix: "%" };
                //chart.options.title = { text: "WireLine Customer Survey" };
                chart.options.title = { text: data.lstPrdic[i].DisconnectReason };
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
                    toolTipContent: "{y} % of Customers comes under <a href = {name}> {label}</a>"

                };
                chart.options.data = [];
                chart.options.data.push(series1);
                //chart.options.data.push(series2);


                series1.dataPoints = [
                        { label: "Loyalty", y: data.lstPrdic[0].YesPercentage },
                        { label: "No Loyalty", y: data.lstPrdic[0].NoPercentage },

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
