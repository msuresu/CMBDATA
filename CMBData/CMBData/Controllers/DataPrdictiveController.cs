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
            return Json("sucess");
        }
    }
}