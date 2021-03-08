import * as express from 'express';
import axios from 'axios';
import { countAllRequests } from './monitoring';

const PORT: string = process.env.PORT || '8080';

const app = express();
app.use(countAllRequests());

app.get('/', (req, res) => {
  console.log('/ req.headers', req.headers);
  axios
    .get(`http://localhost:${PORT}/middle-tier`)
    .then(() => axios.get(`http://localhost:${PORT}/middle-tier`))
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send();
    });
});

app.get('/middle-tier', (req, res) => {
  console.log('/middle-tier req.headers', req.headers);
  // traceparent: '00-77201ce500665dcaf7586700dc40f656-d883d052d4676c32-01',
  // traceparent: '00-77201ce500665dcaf7586700dc40f656-c9bc9797daa12484-01',
  axios
    .get(`http://localhost:${PORT}/backend`)
    .then(() => axios.get(`http://localhost:${PORT}/backend`))
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send();
    });
});

app.get('/backend', (req, res) => {
  console.log('/backend req.headers', req.headers);
  // traceparent: '00-77201ce500665dcaf7586700dc40f656-06981d3d81f385ee-01',
  // traceparent: '00-77201ce500665dcaf7586700dc40f656-bc8e0ea8ebffbaa1-01',
  // traceparent: '00-77201ce500665dcaf7586700dc40f656-862b5fedab83ad66-01',
  // traceparent: '00-77201ce500665dcaf7586700dc40f656-aeb692f82bda8d13-01',
  res.send('Hello from the backend');
});

// app.get('/backend', async (req, res) => {
//   await (() => {
//     return new Promise(res => {
//       setTimeout(res, 3000);
//     });
//   })();

//   res.send('Hello from the backend');
// });

app.listen(parseInt(PORT, 10), () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});
