using CMBDataAnalytics.UIEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMBDataAnalytics.Models
{
    public class DataPredictiveModel
    {
        public DataPredictiveModel()
        {
        }
        public List<LoyalityPredictor> GetPredictedData(string strFileName, string strDisconnectReason, int intRepeatCount, string strTNnumber)
        {
            List<LoyalityPredictor> lstLylPrd = null;
              
            try
            {
                lstLylPrd=new List<LoyalityPredictor>();
                CMBDataPredictiveDAL objDataPredict = CMBDataPredictiveDAL.GetInstance();
                List<CustomerInfo> lstCustomerInfo = objDataPredict.LoadCustomerData(strFileName);
                if (!string.IsNullOrWhiteSpace(strTNnumber) && (string.IsNullOrWhiteSpace(strDisconnectReason) || strDisconnectReason.Equals("All",StringComparison.OrdinalIgnoreCase)))
                {
                   List<CustomerInfo> lstCustomers = lstCustomerInfo.Where(k => k.TNnumber.Equals(strTNnumber, StringComparison.OrdinalIgnoreCase)).ToList();
                    foreach(CustomerInfo info in lstCustomers)
                    {
                        lstLylPrd.Add(GetLoyalityPredictor(lstCustomerInfo, info.DisconnectReason,info.RepeatCount, false));
                    }
                }
                else if (!string.IsNullOrEmpty(strDisconnectReason))
                {
                    lstLylPrd.Add(GetLoyalityPredictor(lstCustomerInfo,strDisconnectReason,intRepeatCount,false));
                }
                else
                {
                    List<string> lstDisconnectReasons = lstCustomerInfo.Select(obj => obj.DisconnectReason).Distinct().ToList();
                    foreach(string strDisconnect in lstDisconnectReasons)
                    {
                        lstLylPrd.Add(GetLoyalityPredictor(lstCustomerInfo,strDisconnect,0,true));
                    }
                }
            }
            catch (Exception ex)
            {
            }
            return lstLylPrd;
        }
        private LoyalityPredictor GetLoyalityPredictor(List<CustomerInfo> lstCustomerInfo, string strDisconnectReason, int intRepeatCount, bool IsLoad)
        {
            LoyalityPredictor objLylPd = null;
            try
            {

                List<CustomerInfo> lstCustomers = (from obj in lstCustomerInfo
                                                   where
                                                       obj.DisconnectReason.Equals(strDisconnectReason, StringComparison.InvariantCultureIgnoreCase) && (IsLoad ? true : obj.RepeatCount == intRepeatCount)
                                                   select obj).ToList();
                if (lstCustomers.Count > 0)
                {
                    int intTotalCustomerCount = lstCustomers.Count;
                    int intYesCount = lstCustomers.FindAll(obj => obj.IsEligibleLoyality == 1).Count;
                    int intNoCount = intTotalCustomerCount - intYesCount;
                    double ftYesCount = Convert.ToDouble(intYesCount);
                    double ftNoCount = Convert.ToDouble(intNoCount);

                    objLylPd = new LoyalityPredictor()
                   {
                       DisconnectReason = strDisconnectReason,
                       NoCount = intNoCount,
                       YesCount = intYesCount,
                       YesPercentage = ((ftYesCount / (ftYesCount + ftNoCount)) * 100) ,
                       NoPercentage = ((ftNoCount / (intYesCount + ftNoCount)) * 100) ,
                       TotalCount = intTotalCustomerCount
                   };
                }
            }
            catch (Exception ex)
            {
            }
            return objLylPd;
        }

    }
}