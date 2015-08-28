using CMBDataAnalytics.Models;
using CMBDataAnalytics.UIEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMBData.Controllers
{
    public class DataPrdictiveController : Controller
    {
        // GET: DataPrdictive
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult getPredictData(string strTN, string strRepeatCount, string strReason)
        {
            int intCount=0;
            if(!string.IsNullOrWhiteSpace(strRepeatCount))
            {
                intCount = Convert.ToInt32(strRepeatCount);
            }
            string strFileName = Server.MapPath("~/App_Data/CustomerData.json");
            DataPredictiveModel objPredictMdl = new DataPredictiveModel();
            DisplayInfo Info = new DisplayInfo();
            Info.lstPrdic = objPredictMdl.GetPredictedData(strFileName, strReason, intCount, strTN);

            return Json(Info);
        }
    }
}