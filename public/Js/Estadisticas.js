document.addEventListener("DOMContentLoaded", () => {
  fetch("/Wime/Controllers/EstadisticasController.php")
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        document.getElementById("tareas-completadas").textContent = data.tareas_completadas;
        document.getElementById("rutinas-finalizadas").textContent = data.rutinas_finalizadas;
        document.getElementById("en-proceso").textContent = data.en_proceso;
      } else {
        console.warn("⚠️ No se pudieron cargar las estadísticas:", data.message);
      }
    })
    .catch(err => console.error("❌ Error de red:", err));
});

//Grafico Estadistico//


document.addEventListener("DOMContentLoaded", () => {
  fetch("/Wime/Controllers/EstadisticasController.php")
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        const ctx = document.getElementById("grafico-estadisticas").getContext("2d");

        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Tareas Realizadas', 'Rutinas Finalizadas', 'En Proceso'],
            datasets: [{
              label: 'Cantidad',
              data: [
                data.tareas_completadas,
                data.rutinas_finalizadas,
                data.en_proceso
              ],
              backgroundColor: [
                'rgba(25, 135, 84, 0.8)',   // verde
                'rgba(13, 110, 253, 0.8)',  // azul
                'rgba(255, 193, 7, 0.8)'    // amarillo
              ],
              borderRadius: 8
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                callbacks: {
                  label: context => `Total: ${context.raw}`
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1
                },
                title: {
                  display: true,
                  text: 'Cantidad'
                }
              }
            }
          }
        });
      } else {
        console.warn("⚠️ No se pudieron cargar las estadísticas:", data.message);
      }
    })
    .catch(err => console.error("❌ Error cargando gráfico:", err));
});

