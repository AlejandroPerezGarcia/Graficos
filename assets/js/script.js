const apiURL = "https://mindicador.cl/api/";
const tipoMoneda = document.querySelector("select");


async function consumoApi() {
  const url = apiURL + tipoMoneda.value;
  let response = await fetch(`${url}`, {
    method: "GET",
  });

  let data = await response.json();
  return data
}

/** 
 * retornar objetos o arreglos
 * utilizables para el gráfico
 * 
 * Titulo gráfico
 * Data
 * Etiquetas
 */

function formateaData(data) {
  let tituloGrafico = data.nombre
  let etiqueta = []
  let valores = []

  data.serie.forEach(punto => {
    /** Formatea la fecha */
    let fecha = new Date(punto.fecha)
    let diaMes = (fecha.getDate()) + '/' + (fecha.getMonth() + 1)
    /** --------------------------- */
    etiqueta.push(diaMes)
    valores.push(punto.valor)
  })

  return { tituloGrafico, etiqueta, valores }
}

let chart;
window.onload = function () {
  document.getElementById("cargarInfo").addEventListener("click", async () => {

    const data = await consumoApi()
    const { tituloGrafico, etiqueta, valores } = formateaData(data)

    if (chart) {
      chart.destroy();
    }

    const ctx = document.getElementById('myChart');
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: etiqueta,
        datasets: [{
          label: tituloGrafico,
          data: valores,
          borderColor: 'rgb( 55, 195, 60)',
          tension: 0.0
        }]
      }
    })
  })
}

function formateaDataCanvasJS(data) {
  let tituloGrafico = data.nombre
  let indexLabel = []
  let y = []
  let dataPoints = []

  data.serie.forEach(punto => {
    /** Formatea la fecha */
    let fecha = new Date(punto.fecha)
    let diaMes = (fecha.getDate()) + '/' + (fecha.getMonth() + 1)
    /** --------------------------- */
    dataPoints.push({
      y: punto.valor,
      indexLabel: diaMes
    })
  })

  return { tituloGrafico, dataPoints }
}

document.getElementById("cargarInfo2").addEventListener("click", async () => {
  const data = await consumoApi()
  const { tituloGrafico, dataPoints } = formateaDataCanvasJS(data)

  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: tituloGrafico
    },
    data: [{
      type: "line",
      indexLabelFontSize: 16,
      dataPoints: dataPoints
    }]
  });
  chart.render();

})



/* window.onload = function () {

  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Simple Line Chart"
    },
    data: [{
      type: "line",
      indexLabelFontSize: 16,
      dataPoints: [
        { y: 920.49, indexLabel: "4/10 " },
        { y: 908.23, indexLabel: "3/10" },
        { y: 901.13, indexLabel: "2/10 " },
        { y: 897.88, indexLabel: "1/10 " },
        { y: 896.25, indexLabel: "30/9" },
        { y: 900.91, indexLabel: "27/9 " },
        { y: 912.24, indexLabel: "26/9 " },
        { y: 911.51, indexLabel: "25/9" },
        { y: 924.81, indexLabel: "24/9 " },
      ]
    }]
  });
  chart.render();

} */


/*  const formatearFecha = (fecha) => {
   console.log(fecha);
   const date = new Date(fecha);
   return `${date.getDate()}/${date.getMonth() + 1}`;
 }; */