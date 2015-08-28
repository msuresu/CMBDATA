using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;
using CMBDataAnalytics.Models;
using CMBData.Controllers;
namespace CMBData.Test
{
    [TestFixture]
    public class DataPredictive
    {
        [Test]
        public void Test1()
        {
            DataPrdictiveController objPredicCtl = new DataPrdictiveController();
            var objJsonReslt=objPredicCtl.getPredictData("", "", "");
            Assert.IsNotNull(objJsonReslt);
        }
        [Test]
        public void Test2()
        {
            DataPrdictiveController objPredicCtl = new DataPrdictiveController();
            var objJsonReslt = objPredicCtl.getPredictData("1001", "2", "Competition or Price");
            Assert.IsNotNull(objJsonReslt);
        }
    }
}
