const { pool } = require("../connection");

const valuationController = {
  getValuation: async (req, res) => {
    const lat = req.body.lat;
    const lng = req.body.lng;
    const width = Number(req.body.width);

    let minWidth, maxWidth;

    if (width < 2) {
      minWidth = 0;
      maxWidth = 2;
    } else if (width >= 2 && width < 4) {
      minWidth = 2;
      maxWidth = 4;
    } else if (width >= 4 && width < 6) {
      minWidth = 4;
      maxWidth = 6;
    } else {
      minWidth = 6;
      maxWidth = 2000;
    }

    pool.query(
      `SELECT don_gia, thoi_diem_dinh_gia , do_rong_hem
        FROM data 
        WHERE (6371000 * ACOS(COS(RADIANS(${lat}))
                        * COS(RADIANS(lat))
                        * COS(RADIANS(lon) - RADIANS(${lng}))
                        + SIN(RADIANS(${lat}))
                        * SIN(RADIANS(lat)))) <= 500
        AND do_rong_hem >= ${minWidth}
        AND do_rong_hem <= ${maxWidth};`,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          throw error;
        }

        if (results.length > 0) {
          let total = 0;

          for (const result of results) {
            const startingValue = Number(result.don_gia);
            const startingDate = new Date(Number(result.thoi_diem_dinh_gia));
            const currentDate = new Date();

            // total month :: (2023 - 2022) * 12 + (7 - 1) = 18 + 6 = 24 months
            const totalMonths =
              (currentDate.getFullYear() - startingDate.getFullYear()) * 12 +
              (currentDate.getMonth() - startingDate.getMonth());

            // total quarters
            const totalQuarters = Math.round(totalMonths / 3);

            // Calculate the current value of the asset
            const currentValue = startingValue * Math.pow(1.02, totalQuarters);

            total += Number(currentValue);
          }

          const result = Math.round(total / results.length);
          const roundedNum = Math.round(result / 1000) * 1000;

          res.send(roundedNum.toString());
          return;
        }

        res.send([]);
      }
    );
  },
};

module.exports = valuationController;
