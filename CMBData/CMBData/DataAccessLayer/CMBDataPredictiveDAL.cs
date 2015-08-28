using CMBDataAnalytics.UIEntities;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;

namespace CMBDataAnalytics
{
    public class CMBDataPredictiveDAL
    {
        private static CMBDataPredictiveDAL objDataPredictive = null;
        private CMBDataPredictiveDAL()
        {
        }
        public static CMBDataPredictiveDAL GetInstance()
        {
            if (objDataPredictive == null)
            {
                objDataPredictive = new CMBDataPredictiveDAL();
            }
            return objDataPredictive;

        }
        public List<CustomerInfo> LoadCustomerData(string strFileName)
        {
            StreamReader objFileStream = null;
            List<CustomerInfo> lstDeserialize = new List<CustomerInfo>();
            try
            {
                objFileStream = new StreamReader(strFileName);
                string strCustomerData = objFileStream.ReadToEnd();
                JObject jObject = JObject.Parse(strCustomerData);
                foreach (var varObj in jObject["data"])
                {
                    CustomerInfo objCust = new CustomerInfo();
                    JToken[] objArry = varObj.ToArray();
                    objCust.DisconnectReason = objArry[0].ToString();
                    objCust.RepeatCount = Convert.ToInt32(objArry[1].ToString());
                    objCust.TNnumber = objArry[2].ToString();
                    objCust.CustomerName = objArry[3].ToString();
                    objCust.IsEligibleLoyality = Convert.ToInt32(objArry[4].ToString());
                    objCust.ReasonIndicator = objArry[5].ToString();
                    lstDeserialize.Add(objCust);
                }

            }
            catch (Exception ex)
            {

            }
            finally
            {
                objFileStream.Close();
            }
            return lstDeserialize;
        }
    }

}
