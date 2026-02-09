"use client"

import { useState, useRef } from "react"
import { toPng } from "html-to-image"
import { jsPDF } from "jspdf"
import Slide1Portada from "@/components/charts/Slide1-Portada"
import Slide2ResumenEjecutivo from "@/components/charts/Slide2-ResumenEjecutivo"
import Slide3DesempenoCliente from "@/components/charts/Slide3-DesempenoCliente"
import Slide4TendenciaMensual from "@/components/charts/Slide4-TendenciaMensual"
import Slide5MixCategoria from "@/components/charts/Slide5-MixCategoria"
import Slide6TopProductos from "@/components/charts/Slide6-TopProductos"
import Slide7Oportunidades from "@/components/charts/Slide9-Oportunidades"
import Slide8Arranque2026 from "@/components/charts/Slide10-Arranque2026"

const slides = [
  { id: 1, name: "Portada", component: Slide1Portada },
  { id: 2, name: "Resumen Ejecutivo", component: Slide2ResumenEjecutivo },
  { id: 3, name: "Desempeño por Cliente", component: Slide3DesempenoCliente },
  { id: 4, name: "Tendencia Mensual", component: Slide4TendenciaMensual },
  { id: 5, name: "Mix por Categoría", component: Slide5MixCategoria },
  { id: 6, name: "Top Productos", component: Slide6TopProductos },
  { id: 7, name: "Oportunidades", component: Slide7Oportunidades },
  { id: 8, name: "Arranque 2026", component: Slide8Arranque2026 },
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [exporting, setExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const slideRef = useRef<HTMLDivElement>(null)
  const CurrentComponent = slides[currentSlide].component

  const exportToPDF = async () => {
    setExporting(true)
    setExportProgress(0)

    // Crear PDF en formato landscape 16:9
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [1280, 720],
    })

    for (let i = 0; i < slides.length; i++) {
      setCurrentSlide(i)
      setExportProgress(((i + 1) / slides.length) * 100)

      // Esperar a que el componente se renderice
      await new Promise((resolve) => setTimeout(resolve, 800))

      if (slideRef.current) {
        try {
          const imgData = await toPng(slideRef.current, {
            quality: 1,
            pixelRatio: 2,
            backgroundColor: "#ffffff",
          })

          if (i > 0) {
            pdf.addPage([1280, 720], "landscape")
          }

          pdf.addImage(imgData, "PNG", 0, 0, 1280, 720)
        } catch (err) {
          console.error("Error capturing slide", i, err)
        }
      }
    }

    pdf.save("Delikos-Resultados-SellIn-2025.pdf")
    setExporting(false)
    setCurrentSlide(0)
  }

  const exportCurrentSlide = async () => {
    if (slideRef.current) {
      try {
        const imgData = await toPng(slideRef.current, {
          quality: 1,
          pixelRatio: 2,
          backgroundColor: "#ffffff",
        })

        const link = document.createElement("a")
        link.download = `Delikos-Slide-${currentSlide + 1}-${slides[currentSlide].name}.png`
        link.href = imgData
        link.click()
      } catch (err) {
        console.error("Error capturing slide", err)
      }
    }
  }

  return (
    <div className="min-h-screen p-8 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-[1280px] mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">DELIKOS - Presentacion Ejecutiva</h1>
          <p className="text-gray-500">Resultados Sell-In 2025</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={exportCurrentSlide}
            disabled={exporting}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm font-medium"
          >
            Descargar Slide Actual (PNG)
          </button>
          <button
            onClick={exportToPDF}
            disabled={exporting}
            className="px-6 py-2 bg-[#1A1A1A] text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 font-medium flex items-center gap-2"
          >
            {exporting ? (
              <>
                <span className="animate-spin">⏳</span>
                Exportando... {Math.round(exportProgress)}%
              </>
            ) : (
              <>Exportar PDF Completo</>
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 max-w-[1280px]">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
            disabled={exporting}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              currentSlide === index
                ? "bg-[#F7B500] text-[#1A1A1A]"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            } disabled:opacity-50`}
          >
            {slide.id}. {slide.name}
          </button>
        ))}
      </div>

      {/* Slide Container */}
      <div ref={slideRef} className="shadow-2xl rounded-lg overflow-hidden border border-gray-200">
        <CurrentComponent />
      </div>

      {/* Navigation Arrows */}
      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
          disabled={currentSlide === 0 || exporting}
          className="px-6 py-3 bg-[#1A1A1A] text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
        >
          Anterior
        </button>
        <span className="text-gray-500">
          {currentSlide + 1} / {slides.length}
        </span>
        <button
          onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
          disabled={currentSlide === slides.length - 1 || exporting}
          className="px-6 py-3 bg-[#F7B500] text-[#1A1A1A] font-semibold rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-400 transition-colors"
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}
