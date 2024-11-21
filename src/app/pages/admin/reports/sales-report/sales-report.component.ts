import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartData, ChartOptions } from 'chart.js/auto';
import { EventService } from '../../../../core/services/event.service';
import { AdminEventSalesReportDTO } from '../../../../shared/models/admin-event-sales-report.model';

@Component({
  selector: 'app-sales-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {
  reportData: AdminEventSalesReportDTO[] = [];
  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      label: 'Cantidad de Inscripciones',
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1
    }]
  };
  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Inscripciones por charla',
        font: {
          size: 20,
          weight: 'bold'
        },
        color: '#333',
        padding: {
          top: 10,
          bottom: 30
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 16,
        },
        bodyFont: {
          size: 14,
        },
        padding: 12,
        callbacks: {
          label: (context) => `Inscripciones: ${context.raw}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad de Inscripciones',
          font: {
            size: 14,
            weight: 'bold'
          },
          color: '#666'
        },
        ticks: {
          font: {
            size: 12
          },
          color: '#666'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Charlas',
          font: {
            size: 14,
            weight: 'bold'
          },
          color: '#666'
        },
        ticks: {
          font: {
            size: 12
          },
          color: '#666'
        },
        grid: {
          display: false
        }
      }
    }
  };

  @ViewChild('salesChart', { static: true }) salesChart!: ElementRef;

  private eventService = inject(EventService);

  ngOnInit(): void {
    this.eventService.getEventsalesReport().subscribe({
      next: (data) => {
        this.reportData = data;
        this.prepareChartData();
        this.renderChart();
      },
      error: (error) => {
        console.error('Error al cargar el reporte de inscripciones:', error);
      }
    });
  }

  prepareChartData(): void {
    this.chartData.labels = this.reportData.map(item => item.nameEvent);
    this.chartData.datasets[0].data = this.reportData.map(item => item.quantity);
  }

  renderChart(): void {
    new Chart(this.salesChart.nativeElement, {
      type: 'bar',
      data: this.chartData,
      options: this.chartOptions,
    } as ChartConfiguration<'bar'>);
  }
}