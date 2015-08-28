using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMBDataAnalytics.UIEntities
{
    public class CustomerInfo
    {
        public string DisconnectReason { get; set; }
        public int RepeatCount { get; set; }
        public string TNnumber { get; set; }
        public string CustomerName { get; set; }
        public int IsEligibleLoyality { get; set; }
        public string ReasonIndicator { get; set; }
       
    }
    public class LoyalityPredictor
    {
        public string DisconnectReason { get; set; }
        public double YesPercentage { get; set; }
        public double NoPercentage { get; set; }
        public int YesCount { get; set; }
        public int NoCount { get; set; }
        public int TotalCount { get; set; }

    }

    public class DisplayInfo
    {
        public List<LoyalityPredictor> lstPrdic { get; set; }
    }
}