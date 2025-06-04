# totalcoin API Integration Flowchart

## 📋 Descripción

Flujograma interactivo que visualiza los diferentes tipos de integraciones disponibles con la API de **totalcoin**. Esta herramienta web permite a desarrolladores y equipos técnicos comprender de manera visual y detallada los procesos de integración para pagos digitales.

## 🚀 Características

### Tipos de Integración Soportados

1. **Cashin - Conciliación Automática**
   - Proceso de recepción de pagos con conciliación automática
   - Gestión de pre-órdenes
   - Notificaciones webhook en tiempo real

2. **Cashin - Pre-órdenes con QR**
   - Generación automática de códigos QR
   - QR estáticos y dinámicos
   - Configuración de montos fijos o variables

3. **Notificaciones Webhook**
   - Notificaciones en tiempo real
   - Soporte para múltiples métodos de pago
   - Información detallada de transacciones

4. **Cashout - Realizar Pagos**
   - Pagos a CBU/CVU
   - Pagos por Alias
   - Integración con sistema bancario argentino

### Funcionalidades Interactivas

- **Navegación por pestañas**: Cambia entre diferentes tipos de integración
- **Pasos detallados**: Cada paso del flujo es clickeable para ver información técnica
- **Documentación enlazada**: Acceso directo a la documentación técnica específica
- **Diseño responsivo**: Optimizado para desktop y dispositivos móviles
- **Modal informativo**: Detalles técnicos con ejemplos de código

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con gradientes y efectos
- **JavaScript ES6+**: Interactividad y gestión de estados
- **Diseño Responsivo**: Grid CSS y Media Queries

## 📦 Instalación y Uso

### Requisitos Previos
- Python 3.x (para servidor local)
- Navegador web moderno

### Ejecución Local

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/totalcoin-API-flowchart.git
   cd totalcoin-API-flowchart
   ```

2. **Iniciar servidor local**
   ```bash
   python3 -m http.server 8000
   ```

3. **Abrir en navegador**
   ```
   http://localhost:8000
   ```

### Estructura del Proyecto

```
totalcoin-API-flowchart/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
├── images/             # Recursos gráficos
│   └── Logo Completo Slogan nuevo.svg
└── README.md           # Documentación
```

## 🎨 Características de Diseño

- **Gradiente azul**: Colores corporativos de totalcoin (#003e70 a #33658d)
- **Layout responsivo**: 35% sidebar, 65% área principal en desktop
- **Efectos hover**: Animaciones suaves en elementos interactivos
- **Tipografía clara**: Arial para máxima legibilidad
- **Iconografía**: Emojis para mejor UX

## 📖 Cómo Usar

1. **Seleccionar tipo de integración**: Haz clic en los botones del sidebar izquierdo
2. **Explorar el flujo**: Revisa los pasos numerados en el área principal
3. **Ver detalles técnicos**: Haz clic en cualquier paso para ver información detallada
4. **Acceder a documentación**: Usa el enlace de "Documentación Técnica" para cada tipo

## 🔗 Enlaces Útiles

- [Documentación API totalcoin](https://apidocs.totalcoin.com/)
- [Conciliación Automática](https://apidocs.totalcoin.com/integrations/pre_orders/es/index.html)
- [Pre-órdenes con QR](https://apidocs.totalcoin.com/integrations/pre_orders_qr/es/index.html)
- [Notificaciones Webhook](https://apidocs.totalcoin.com/integrations/without_pre_order/es/index.html)
- [Realizar Pagos](https://apidocs.totalcoin.com/integrations/payments/es/index.html)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrí un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o consultas sobre las integraciones de totalcoin:
- Email: soporte@totalcoin.com
- Documentación: [apidocs.totalcoin.com](https://apidocs.totalcoin.com/)

---

**Desarrollado con ❤️ para la comunidad de desarrolladores de totalcoin por Santiago Israelevich**