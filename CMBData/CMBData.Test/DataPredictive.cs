using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;
using CMBDataAnalytics.Models;
namespace CMBData.Test
{
    [TestFixture]
    public class DataPredictive
    {
        [Test]
        public void Test()
        {
            DataPredictiveModel objPredictMdl = new DataPredictiveModel();
            Assert.IsNotNull(objPredictMdl);
     
        }
    }
}
