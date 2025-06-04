// Información detallada para cada tipo de integración
const integrationInfo = {
    'cashin-auto': {
        title: 'Cashin - Conciliación Automática',
        description: 'Este flujo detalla el proceso de integración para el cashin con conciliación automática, permitiendo a los clientes de <strong>totalcoin</strong> recibir pagos y que estos sean conciliados automáticamente con sus pre-órdenes.',
        features: [
            'Conciliación automática de pagos',
            'Gestión de pre-órdenes',
            'Notificaciones webhook',
            'Soporte para múltiples métodos de pago'
        ],
        endpoints: [
            'POST /api/auth/login',
            'POST /api/conciliacionAutomaticaV2/cashRequest'
        ]
    },
    'cashin-qr': {
        title: 'Cashin - Pre-órdenes con QR',
        description: 'Este flujo describe la integración de pre-órdenes con QR, donde <strong>totalcoin</strong> genera un código QR para cada pre-orden, facilitando el pago por parte del usuario y su posterior conciliación automática.',
        features: [
            'Generación automática de códigos QR',
            'QR estáticos y dinámicos',
            'Configuración de montos fijos o variables',
            'Seguimiento de pedidos en tiempo real',
            'Expiración configurable de QR'
        ],
        endpoints: [
            'POST /api/auth/login - Autenticación',
            'POST /api/iep/pre-order - Crear pre-orden con QR'
        ]
    },
    'webhook': {
        title: 'Notificaciones Webhook',
        description: 'Este flujo explica cómo <strong>totalcoin</strong> envía notificaciones automáticas a tu sistema (webhooks) sobre eventos importantes como pagos completados o fallidos, asegurando que tu plataforma esté siempre sincronizada.',
        features: [
            'Notificaciones en tiempo real',
            'Soporte para transferencias bancarias',
            'Soporte para pagos QR',
            'Soporte para tarjetas de débito/crédito',
            'Información detallada del pago'
        ],
        endpoints: [
            'Webhook configurado por el cliente',
            'Recibe notificaciones POST con datos del pago'
        ]
    },
    'cashout': {
        title: 'Cashout - Realizar Pagos',
        description: 'Este flujo detalla el proceso para realizar pagos a través de la API de <strong>totalcoin</strong>, permitiendo a tu sistema iniciar y gestionar transferencias de dinero de forma programática.',
        features: [
            'Pagos a CBU/CVU',
            'Pagos por Alias',
            'Notificaciones de resultado',
            'Seguimiento de transacciones',
            'Integración con sistema bancario argentino'
        ],
        endpoints: [
            'POST /api/auth/login - Autenticación',
            'POST /api/payments/transactions - Realizar pago'
        ]
    }
};

// Información detallada de cada paso
const stepDetails = {
    'cashin-auto': {
        1: {
            title: 'Autenticación OAuth 2.0',
            description: 'El primer paso es autenticarse usando las credenciales proporcionadas por el departamento de soporte de totalcoin.',
            technical: {
                method: 'POST',
                endpoint: '/api/auth/login',
                headers: {'Content-Type': 'application/json'},
                body: {username: 'tu_usuario', password: 'tu_contraseña'},
                response: {token: 'jwt_token', expires_in: 3600}
            },
            notes: 'El token debe incluirse en todas las siguientes peticiones como Bearer Token.'
        },
        2: {
            title: 'Crear Pre-Orden',
            description: 'Se crea una pre-orden que notifica a totalcoin sobre un posible pago futuro.',
            technical: {
                method: 'POST',
                endpoint: '/api/conciliacionAutomaticaV2/cashRequest',
                headers: {'Authorization': 'Bearer {token}', 'Content-Type': 'application/json'},
                body: {
                    OperationId: 'ID_UNICO_OPERACION',
                    Amount: 1000,
                    DNI: '12345678',
                    CompanyReferenceToConciliate: ''
                },
                response: 'true/false'
            },
            notes: 'El CompanyReferenceToConciliate debe estar vacío en la pre-orden.'
        },
        3: {
            title: 'Usuario Realiza Pago',
            description: 'El usuario final realiza el pago utilizando cualquiera de los métodos soportados.',
            technical: {
                methods: ['Transferencia bancaria (CBU/CVU)', 'Pago QR', 'Tarjeta de débito/crédito'],
                process: 'El usuario utiliza su aplicación bancaria o wallet para realizar el pago'
            },
            notes: 'totalcoin detecta automáticamente el pago en sus sistemas.'
        },
        4: {
            title: 'Conciliación Automática',
            description: 'totalcoin procesa el pago recibido y lo concilia automáticamente con la pre-orden.',
            technical: {
                process: 'Sistema interno de totalcoin',
                matching: 'Se utiliza el monto, DNI y otros datos para hacer el matching',
                validation: 'Se validan todos los datos antes de confirmar la conciliación'
            },
            notes: 'Este proceso es completamente automático y transparente para el cliente.'
        },
        5: {
            title: 'Notificación Webhook',
            description: 'Una vez conciliado el pago, totalcoin envía una notificación al webhook configurado.',
            technical: {
                method: 'POST',
                endpoint: 'URL_WEBHOOK_CLIENTE',
                payload: 'Información completa del pago procesado'
            },
            notes: 'El cliente debe responder con HTTP 200 para confirmar la recepción.'
        }
    },
    'cashin-qr': {
        1: {
            title: 'Autenticación OAuth 2.0',
            description: 'Autenticación inicial para acceder a la API de pre-órdenes con QR.',
            technical: {
                method: 'POST',
                endpoint: '/api/auth/login',
                domain: 'https://apicobranzastest.totalcoin.com (test) / https://apicobranzas.totalcoin.com (prod)'
            },
            notes: 'Las credenciales deben solicitarse al departamento técnico.'
        },
        2: {
            title: 'Crear Pre-Orden con QR',
            description: 'Se crea una pre-orden que automáticamente genera un código QR para el pago.',
            technical: {
                method: 'POST',
                endpoint: '/api/iep/pre-order',
                qrTypes: ['static - QR reutilizable', 'dynamic - QR de un solo uso'],
                amountTypes: ['closed - monto fijo', 'open - monto variable']
            },
            notes: 'El QR puede configurarse para resetear después de cada pago exitoso.'
        },
        3: {
            title: 'Generar Código QR',
            description: 'El sistema genera automáticamente el código QR basado en los parámetros de la pre-orden.',
            technical: {
                format: 'QR Code estándar',
                content: 'Información de pago codificada',
                expiration: 'Configurable según expirationDate'
            },
            notes: 'El QR contiene toda la información necesaria para el pago.'
        },
        4: {
            title: 'Usuario Escanea QR',
            description: 'El usuario final escanea el código QR con su aplicación de pago preferida.',
            technical: {
                apps: ['Aplicaciones bancarias', 'Wallets digitales', 'Apps de pago'],
                process: 'Escaneo automático de datos de pago'
            },
            notes: 'El proceso es intuitivo y familiar para los usuarios.'
        },
        5: {
            title: 'Procesamiento y Notificación',
            description: 'totalcoin procesa el pago y envía las notificaciones correspondientes.',
            technical: {
                processing: 'Validación y procesamiento del pago',
                notification: 'Webhook al cliente con detalles del pago'
            },
            notes: 'Se incluye información de conciliación en la notificación.'
        }
    },
    'webhook': {
        1: {
            title: 'Configuración Webhook',
            description: 'El cliente debe proporcionar una URL segura donde recibirá las notificaciones.',
            technical: {
                requirements: ['URL HTTPS', 'Endpoint POST', 'Respuesta HTTP 200'],
                security: 'Canal seguro para proporcionar la URL'
            },
            notes: 'La URL debe estar disponible 24/7 para recibir notificaciones.'
        },
        2: {
            title: 'Pago Recibido',
            description: 'totalcoin recibe un pago a través de cualquiera de sus canales soportados.',
            technical: {
                channels: [
                    'Transferencia bancaria (CBU/CVU)',
                    'Pago QR',
                    'Tarjeta de débito',
                    'Tarjeta de crédito'
                ]
            },
            notes: 'El sistema detecta automáticamente el canal utilizado.'
        },
        3: {
            title: 'Llamada HTTP POST',
            description: 'totalcoin envía una notificación POST al webhook configurado con todos los detalles del pago.',
            technical: {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                payload: 'JSON con información completa del pago'
            },
            notes: 'Incluye montos, fechas, método de pago y datos del emisor.'
        },
        4: {
            title: 'Procesamiento Cliente',
            description: 'El cliente recibe y procesa la notificación según su lógica de negocio.',
            technical: {
                response: 'HTTP 200 para confirmar recepción',
                processing: 'Lógica de negocio del cliente',
                retry: 'totalcoin reintenta si no recibe confirmación'
            },
            notes: 'Es importante responder rápidamente para evitar reintentos.'
        }
    },
    'cashout': {
        1: {
            title: 'Autenticación OAuth 2.0',
            description: 'Autenticación para acceder a la API de pagos salientes.',
            technical: {
                method: 'POST',
                endpoint: '/api/auth/login',
                scope: 'Permisos para realizar pagos'
            },
            notes: 'Se requieren permisos especiales para realizar pagos.'
        },
        2: {
            title: 'Realizar Pago',
            description: 'Se envía la solicitud de pago con los datos del destinatario.',
            technical: {
                method: 'POST',
                endpoint: '/api/payments/transactions',
                options: ['CBU/CVU (22 dígitos)', 'Alias bancario'],
                required: ['CUIT/CUIL', 'Monto', 'Referencia', 'URL notificación']
            },
            notes: 'Debe especificarse alias O cbu/cvu, no ambos.'
        },
        3: {
            title: 'Procesamiento',
            description: 'totalcoin procesa la transferencia a través del sistema bancario argentino.',
            technical: {
                validation: 'Validación de datos bancarios',
                processing: 'Envío a través de la red bancaria',
                timing: 'Procesamiento en tiempo real o diferido'
            },
            notes: 'Los tiempos dependen del banco receptor.'
        },
        4: {
            title: 'Respuesta',
            description: 'La API retorna un ID único de la transacción para seguimiento.',
            technical: {
                response: {id: 'transaction_unique_id'},
                status: 'Confirmación de recepción de la solicitud'
            },
            notes: 'El ID permite hacer seguimiento posterior de la transacción.'
        },
        5: {
            title: 'Notificación de Resultado',
            description: 'totalcoin notifica el resultado final de la transferencia.',
            technical: {
                method: 'POST',
                endpoint: 'notificationUrl proporcionada',
                statuses: ['Exitoso', 'Rechazado', 'Pendiente']
            },
            notes: 'La notificación incluye el estado final y detalles adicionales.'
        }
    }
};

class FlowchartManager {
    constructor() {
        this.currentFlow = 'cashin-auto';
        this.modal = document.getElementById('step-modal');
        this.modalBody = document.getElementById('modal-body');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateInfoPanel();
    }

    setupEventListeners() {
        // Botones de integración
        document.querySelectorAll('.integration-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchFlow(e.target.dataset.flow);
            });
        });

        // Steps clickeables
        document.querySelectorAll('.step').forEach(step => {
            step.addEventListener('click', (e) => {
                this.showStepDetails(e.currentTarget);
            });
        });

        // Modal
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });

        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    switchFlow(flowType) {
        // Update active button
        document.querySelectorAll('.integration-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-flow="${flowType}"]`).classList.add('active');

        // Update active diagram
        document.querySelectorAll('.flow-diagram').forEach(diagram => {
            diagram.classList.remove('active');
        });
        document.getElementById(flowType).classList.add('active');

        this.currentFlow = flowType;
        this.updateInfoPanel();
        
        // Mostrar/ocultar enlaces de documentación relevantes
        updateDocumentationLinks(flowType);
    }

    updateInfoPanel() {
        const info = integrationInfo[this.currentFlow];
        const infoPanel = document.getElementById('flow-info');
        
        infoPanel.innerHTML = `
            <h5 style="color: #003E70; margin-bottom: 1rem; font-weight: 600;">${info.title}</h5>
            <p style="margin-bottom: 1rem; line-height: 1.6;">${info.description}</p>
            
            <h6 style="color: #F37D3D; margin-bottom: 0.5rem; font-weight: 600;">Características:</h6>
            <ul style="margin-bottom: 1rem; padding-left: 1.2rem;">
                ${info.features.map(feature => `<li style="margin-bottom: 0.3rem; color: #666;">${feature}</li>`).join('')}
            </ul>
            
            <h6 style="color: #F37D3D; margin-bottom: 0.5rem; font-weight: 600;">Endpoints principales:</h6>
            <ul style="padding-left: 1.2rem;">
                ${info.endpoints.map(endpoint => `<li style="margin-bottom: 0.3rem; color: #666; font-family: monospace; font-size: 0.85rem;">${endpoint}</li>`).join('')}
            </ul>
        `;
    }

    showStepDetails(stepElement) {
        const stepNumber = stepElement.dataset.step;
        const stepInfo = stepDetails[this.currentFlow][stepNumber];
        
        if (!stepInfo) return;

        let technicalContent = '';
        if (stepInfo.technical) {
            if (stepInfo.technical.method && stepInfo.technical.endpoint) {
                technicalContent += `
                    <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                        <h6 style="color: #003E70; margin-bottom: 0.5rem;">Detalles Técnicos:</h6>
                        <p><strong>Método:</strong> ${stepInfo.technical.method}</p>
                        <p><strong>Endpoint:</strong> <code>${stepInfo.technical.endpoint}</code></p>
                        ${stepInfo.technical.headers ? `<p><strong>Headers:</strong> <code>${JSON.stringify(stepInfo.technical.headers)}</code></p>` : ''}
                        ${stepInfo.technical.body ? `<p><strong>Body:</strong></p><pre style="background: white; padding: 0.5rem; border-radius: 4px; overflow-x: auto;"><code>${JSON.stringify(stepInfo.technical.body, null, 2)}</code></pre>` : ''}
                        ${stepInfo.technical.response ? `<p><strong>Response:</strong> <code>${typeof stepInfo.technical.response === 'object' ? JSON.stringify(stepInfo.technical.response) : stepInfo.technical.response}</code></p>` : ''}
                    </div>
                `;
            } else if (stepInfo.technical.methods) {
                technicalContent += `
                    <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                        <h6 style="color: #003E70; margin-bottom: 0.5rem;">Métodos Soportados:</h6>
                        <ul>
                            ${stepInfo.technical.methods.map(method => `<li>${method}</li>`).join('')}
                        </ul>
                    </div>
                `;
            } else {
                technicalContent += `
                    <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                        <h6 style="color: #003E70; margin-bottom: 0.5rem;">Información Técnica:</h6>
                        ${Object.entries(stepInfo.technical).map(([key, value]) => {
                            if (Array.isArray(value)) {
                                return `<p><strong>${key}:</strong></p><ul>${value.map(item => `<li>${item}</li>`).join('')}</ul>`;
                            }
                            return `<p><strong>${key}:</strong> ${value}</p>`;
                        }).join('')}
                    </div>
                `;
            }
        }

        this.modalBody.innerHTML = `
            <h3 style="color: #003E70; margin-bottom: 1rem;">${stepInfo.title}</h3>
            <p style="margin-bottom: 1rem; line-height: 1.6;">${stepInfo.description}</p>
            ${technicalContent}
            ${stepInfo.notes ? `<div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 1rem; border-radius: 8px; margin-top: 1rem;"><strong>Nota:</strong> ${stepInfo.notes}</div>` : ''}
        `;
        
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Función para actualizar enlaces de documentación
function updateDocumentationLinks(flowType) {
    // Hide all documentation links first
    document.querySelectorAll('.doc-link').forEach(link => {
        link.style.display = 'none';
    });

    // Define the correct URLs for each documentation link
    const docUrls = {
        'cashin-automatic': 'https://apidocs.totalcoin.com/integrations/pre_orders/es/index.html',
        'cashin-qr': 'https://apidocs.totalcoin.com/integrations/pre_orders_qr/es/index.html',
        'webhook': 'https://apidocs.totalcoin.com/integrations/without_pre_order/es/index.html',
        'cashout': 'https://apidocs.totalcoin.com/integrations/payments/es/index.html'
    };

    // Handle special case for cashin-auto
    if (flowType === 'cashin-auto') {
        flowType = 'cashin-automatic';
    }

    // Show the relevant documentation link based on flowType and update its href
    const linkElement = document.getElementById(`doc-${flowType}`);
    if (linkElement) {
        linkElement.href = docUrls[flowType];
        linkElement.style.display = 'block';
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new FlowchartManager();
    
    // Agregar efecto de carga suave
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Mostrar enlace inicial
    updateDocumentationLinks('cashin-auto');
});

// Agregar smooth scrolling para navegación
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// ===== FUNCIONALIDAD DE ANIMACIÓN DEL FLUJO DE DINERO =====

class MoneyFlowAnimation {
    constructor() {
        this.isPlaying = false;
        this.isPaused = false;
        this.currentStep = 0;
        this.currentFlow = 'cashin-auto';
        this.animationSpeed = 1;
        this.timelineInterval = null;
        this.stepTimeout = null;
        
        this.flowSteps = {
            'cashin-auto': [
                { name: 'Autenticación', duration: 2000, description: 'Sistema se autentica con totalcoin' },
                { name: 'Crear Pre-orden', duration: 1500, description: 'Se registra la intención de pago' },
                { name: 'Usuario Paga', duration: 3000, description: 'Cliente realiza transferencia bancaria' },
                { name: 'Conciliación', duration: 2500, description: 'totalcoin procesa y concilia automáticamente' },
                { name: 'Notificación', duration: 1500, description: 'Webhook confirma el pago exitoso' }
            ],
            'cashin-qr': [
                { name: 'Autenticación', duration: 2000, description: 'Sistema se autentica con totalcoin' },
                { name: 'Crear QR', duration: 1500, description: 'Se genera código QR para el pago' },
                { name: 'Escanear QR', duration: 2000, description: 'Usuario escanea con su app bancaria' },
                { name: 'Procesar Pago', duration: 2500, description: 'totalcoin procesa el pago QR' },
                { name: 'Confirmar', duration: 1500, description: 'Notificación de pago exitoso' }
            ],
            'webhook': [
                { name: 'Configurar Webhook', duration: 1500, description: 'Cliente configura URL de notificación' },
                { name: 'Recibir Pago', duration: 3000, description: 'totalcoin recibe pago del usuario' },
                { name: 'Procesar', duration: 2000, description: 'Sistema valida y procesa el pago' },
                { name: 'Enviar Webhook', duration: 1500, description: 'Notificación POST al cliente' },
                { name: 'Confirmar', duration: 1000, description: 'Cliente responde HTTP 200' }
            ],
            'cashout': [
                { name: 'Autenticación', duration: 2000, description: 'Sistema se autentica para pagos' },
                { name: 'Solicitar Pago', duration: 1500, description: 'Se envía orden de transferencia' },
                { name: 'Validar Datos', duration: 2000, description: 'totalcoin valida datos bancarios' },
                { name: 'Transferir', duration: 3500, description: 'Procesamiento a través del sistema bancario' },
                { name: 'Notificar Resultado', duration: 1500, description: 'Confirmación del estado final' }
            ]
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateFlowSelector();
        this.resetAnimation();
    }
    
    setupEventListeners() {
        // Botón para mostrar/ocultar la sección de animación
        const animationBtn = document.getElementById('animation-btn');
        if (animationBtn) {
            animationBtn.addEventListener('click', () => {
                this.toggleAnimationSection();
            });
        }
        
        // Controles de animación
        const playBtn = document.getElementById('play-btn');
        const pauseBtn = document.getElementById('pause-btn');
        const resetBtn = document.getElementById('reset-btn');
        const flowSelector = document.getElementById('flow-selector');
        const speedSlider = document.getElementById('speed-slider');
        
        if (playBtn) playBtn.addEventListener('click', () => this.playAnimation());
        if (pauseBtn) pauseBtn.addEventListener('click', () => this.pauseAnimation());
        if (resetBtn) resetBtn.addEventListener('click', () => this.resetAnimation());
        if (flowSelector) flowSelector.addEventListener('change', (e) => this.changeFlow(e.target.value));
        if (speedSlider) speedSlider.addEventListener('input', (e) => this.changeSpeed(e.target.value));
    }
    
    toggleAnimationSection() {
        const animationSection = document.getElementById('animation-visualization');
        // Verificar si está visible usando getComputedStyle para obtener el estado real
        const computedStyle = window.getComputedStyle(animationSection);
        const isVisible = computedStyle.display !== 'none';
        
        console.log(`Toggle animation - Estado actual: ${isVisible ? 'visible' : 'oculto'}`);
        
        if (isVisible) {
            animationSection.style.display = 'none';
            this.resetAnimation();
            console.log('Ocultando sección de animación');
        } else {
            // Ocultar otros diagramas
            document.querySelectorAll('.flow-diagram').forEach(diagram => {
                diagram.classList.remove('active');
            });
            
            // Mostrar sección de animación
            animationSection.style.display = 'block';
            this.resetAnimation();
            console.log('Mostrando sección de animación');
        }
    }
    
    updateFlowSelector() {
        const selector = document.getElementById('flow-selector');
        if (selector) {
            selector.innerHTML = `
                <option value="cashin-auto">Cashin - Conciliación Automática</option>
                <option value="cashin-qr">Cashin - Pre-órdenes con QR</option>
                <option value="webhook">Notificaciones Webhook</option>
                <option value="cashout">Cashout - Realizar Pagos</option>
            `;
            selector.value = this.currentFlow;
        }
    }
    
    changeFlow(flowType) {
        this.currentFlow = flowType;
        this.resetAnimation();
        this.updateInfoSection();
    }
    
    changeSpeed(speed) {
        this.animationSpeed = parseFloat(speed);
        const speedLabel = document.getElementById('speed-label');
        if (speedLabel) {
            speedLabel.textContent = `${speed}x`;
        }
    }
    
    playAnimation() {
        if (this.isPaused) {
            this.resumeAnimation();
        } else {
            this.startAnimation();
        }
    }
    
    startAnimation() {
        if (this.isPlaying) return;
        
        this.isPlaying = true;
        this.isPaused = false;
        this.currentStep = 0;
        
        this.updateControls();
        this.runAnimationStep();
        this.startTimeline();
    }
    
    resumeAnimation() {
        if (!this.isPaused) return;
        
        this.isPaused = false;
        this.updateControls();
        this.runAnimationStep();
        this.startTimeline();
    }
    
    pauseAnimation() {
        if (!this.isPlaying || this.isPaused) return;
        
        this.isPaused = true;
        this.updateControls();
        
        if (this.stepTimeout) {
            clearTimeout(this.stepTimeout);
            this.stepTimeout = null;
        }
        
        if (this.timelineInterval) {
            clearInterval(this.timelineInterval);
            this.timelineInterval = null;
        }
    }
    
    resetAnimation() {
        this.isPlaying = false;
        this.isPaused = false;
        this.currentStep = 0;
        
        if (this.stepTimeout) {
            clearTimeout(this.stepTimeout);
            this.stepTimeout = null;
        }
        
        if (this.timelineInterval) {
            clearInterval(this.timelineInterval);
            this.timelineInterval = null;
        }
        
        this.updateControls();
        this.resetVisualElements();
        this.updateInfoSection();
        this.resetTimeline();
    }
    
    runAnimationStep() {
        if (!this.isPlaying || this.isPaused) return;
        
        const steps = this.flowSteps[this.currentFlow];
        if (this.currentStep >= steps.length) {
            this.completeAnimation();
            return;
        }
        
        const step = steps[this.currentStep];
        this.executeStep(step, this.currentStep);
        
        const duration = step.duration / this.animationSpeed;
        this.stepTimeout = setTimeout(() => {
            this.currentStep++;
            this.runAnimationStep();
        }, duration);
    }
    
    executeStep(step, stepIndex) {
        console.log(`Ejecutando paso ${stepIndex}: ${step.name}`);
        
        // Actualizar indicadores de proceso
        this.updateProcessIndicators(stepIndex);
        
        // Animar flecha
        this.animateArrow(stepIndex);
        
        // Mostrar notificación
        this.showNotification(step.name, step.description);
        
        // Actualizar información
        this.updateStepInfo(step, stepIndex);
    }
    
    updateProcessIndicators(activeStep) {
        const timelineSteps = document.querySelectorAll('.timeline-step');
        console.log(`Actualizando timeline - Paso activo: ${activeStep}, Total pasos: ${timelineSteps.length}`);
        
        timelineSteps.forEach((step, index) => {
            step.classList.remove('active', 'completed');
            if (index < activeStep) {
                step.classList.add('completed');
                console.log(`Paso ${index} marcado como completado`);
            } else if (index === activeStep) {
                step.classList.add('active');
                console.log(`Paso ${index} marcado como activo`);
            }
        });
    }
    
    animateArrow(stepIndex) {
        const arrowContainer = document.querySelector('.arrow-container');
        const flowArrow = document.querySelector('.flow-arrow');
        const processingSpinner = document.querySelector('.processing-spinner');
        
        if (!arrowContainer || !flowArrow) {
            console.log('No se encontró el elemento .arrow-container o .flow-arrow');
            return;
        }
        
        console.log(`Animando flecha - Paso: ${stepIndex}, Flujo: ${this.currentFlow}`);
        
        // Remover clases anteriores
        arrowContainer.classList.remove('move-to-totalcoin', 'move-to-user', 'move-from-user', 'move-to-bank', 'move-to-client', 'move-bank-to-user', 'processing', 'returning-to-center', 'move-totalcoin-to-client', 'move-totalcoin-to-bank', 'move-totalcoin-to-user');
        flowArrow.classList.remove('active');
        
        // Resetear spinner
        if (processingSpinner) {
            processingSpinner.classList.remove('active');
        }
        
        // Forzar un reflow para asegurar que las clases se remuevan
        arrowContainer.offsetHeight;
        
        // Activar el elemento correspondiente
        this.activateSystemElement(stepIndex);
        
        // Aplicar la animación directamente sin regreso al centro
        this.applyStepAnimation(stepIndex, arrowContainer);
    }
    
    applyStepAnimation(stepIndex, arrowContainer) {
        // Forzar un reflow para asegurar que las clases se remuevan
        arrowContainer.offsetHeight;
        
        const flowArrow = document.querySelector('.flow-arrow');
        const processingSpinner = document.querySelector('.processing-spinner');
        
        // Agregar animación según el paso y flujo
        let animationClass = '';
        let isProcessingStep = false;
        
        switch (this.currentFlow) {
            case 'cashin-auto':
                if (stepIndex === 0) { // Autenticación: Cliente -> totalcoin
                    animationClass = 'move-to-totalcoin';
                } else if (stepIndex === 1) { // Crear Pre-orden: Cliente -> totalcoin
                    animationClass = 'move-to-totalcoin';
                } else if (stepIndex === 2) { // Usuario Paga: Usuario -> totalcoin
                    animationClass = 'move-from-user';
                } else if (stepIndex === 3) { // Conciliación: procesamiento en totalcoin
                    isProcessingStep = true;
                } else if (stepIndex === 4) { // Notificación: totalcoin -> Cliente
                    animationClass = 'move-totalcoin-to-client';
                }
                break;
            case 'cashin-qr':
                if (stepIndex === 0) { // Autenticación: Cliente -> totalcoin
                    animationClass = 'move-to-totalcoin';
                } else if (stepIndex === 1) { // Crear QR: Cliente -> totalcoin
                    animationClass = 'move-to-totalcoin';
                } else if (stepIndex === 2) { // Escanear QR: Usuario -> totalcoin
                    animationClass = 'move-from-user';
                } else if (stepIndex === 3) { // Procesar Pago: procesamiento en totalcoin
                    isProcessingStep = true;
                } else if (stepIndex === 4) { // Confirmar: totalcoin -> Cliente
                    animationClass = 'move-totalcoin-to-client';
                }
                break;
            case 'webhook':
                if (stepIndex === 0) { // Configurar Webhook: Cliente -> totalcoin
                    animationClass = 'move-to-totalcoin';
                } else if (stepIndex === 1) { // Recibir Pago: Usuario -> totalcoin
                    animationClass = 'move-from-user';
                } else if (stepIndex === 2) { // Procesar: procesamiento en totalcoin
                    isProcessingStep = true;
                } else if (stepIndex === 3) { // Enviar Webhook: totalcoin -> Cliente
                    animationClass = 'move-totalcoin-to-client';
                } else if (stepIndex === 4) { // Confirmar: Cliente responde a totalcoin
                    animationClass = 'move-to-totalcoin';
                }
                break;
            case 'cashout':
                if (stepIndex === 0) { // Autenticación: Cliente -> totalcoin
                    animationClass = 'move-to-totalcoin';
                } else if (stepIndex === 1) { // Solicitar Pago: Cliente -> totalcoin
                    animationClass = 'move-to-totalcoin';
                } else if (stepIndex === 2) { // Validar Datos: procesamiento en totalcoin
                    isProcessingStep = true;
                } else if (stepIndex === 3) { // Transferir: totalcoin -> Banco -> Usuario
                    animationClass = 'move-totalcoin-to-bank';
                } else if (stepIndex === 4) { // Notificar Resultado: totalcoin -> Cliente
                    animationClass = 'move-totalcoin-to-client';
                }
                break;
        }
        
        if (isProcessingStep) {
            // Mostrar spinner y ocultar flecha durante procesamiento
            console.log(`Mostrando spinner para paso de procesamiento ${stepIndex}`);
            if (flowArrow) {
                flowArrow.classList.remove('active');
            }
            if (processingSpinner) {
                processingSpinner.classList.add('active');
            }
        } else if (animationClass) {
            // Mostrar flecha y ocultar spinner para otros pasos
            console.log(`Aplicando clase: ${animationClass} para paso ${stepIndex}: ${this.flowSteps[this.currentFlow][stepIndex].name}`);
            if (processingSpinner) {
                processingSpinner.classList.remove('active');
            }
            if (flowArrow) {
                flowArrow.classList.add('active');
            }
            arrowContainer.classList.add(animationClass);
        }
    }
    
    showNotification(title, description) {
        const popup = document.getElementById('notification-popup');
        if (!popup) return;
        
        popup.innerHTML = `
            <div class="notification-content">
                <h4>${title}</h4>
                <p>${description}</p>
            </div>
        `;
        
        popup.classList.add('show');
        
        setTimeout(() => {
            popup.classList.remove('show');
        }, 2000 / this.animationSpeed);
    }
    
    updateStepInfo(step, stepIndex) {
        const infoSection = document.getElementById('animation-info');
        if (!infoSection) return;
        
        const steps = this.flowSteps[this.currentFlow];
        const progress = ((stepIndex + 1) / steps.length) * 100;
        
        infoSection.innerHTML = `
            <h4>Paso ${stepIndex + 1} de ${steps.length}: ${step.name}</h4>
            <p>${step.description}</p>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
            <small>Progreso: ${Math.round(progress)}%</small>
        `;
    }
    
    activateSystemElement(stepIndex) {
        // Remover clase active de todos los elementos del sistema
        document.querySelectorAll('.system-element').forEach(element => {
            element.classList.remove('active');
        });
        
        // Activar el elemento correspondiente según el flujo y paso
        const elementMap = {
            'cashin-auto': ['client', 'totalcoin', 'user', 'totalcoin', 'client'],
            'cashin-qr': ['client', 'totalcoin', 'user', 'totalcoin', 'client'],
            'webhook': ['user', 'totalcoin', 'client'],
            'cashout': ['client', 'totalcoin', 'bank', 'user']
        };
        
        const elements = elementMap[this.currentFlow];
        if (elements && stepIndex < elements.length) {
            const targetElement = document.querySelector(`.system-element[data-element="${elements[stepIndex]}"]`);
            if (targetElement) {
                targetElement.classList.add('active');
            }
        }
    }
    
    startTimeline() {
        const timeline = document.getElementById('timeline');
        if (!timeline) return;
        
        const totalDuration = this.flowSteps[this.currentFlow].reduce((sum, step) => sum + step.duration, 0);
        let elapsed = 0;
        
        this.timelineInterval = setInterval(() => {
            if (this.isPaused) return;
            
            elapsed += 100;
            const progress = (elapsed / totalDuration) * 100;
            timeline.style.setProperty('--progress', `${Math.min(progress, 100)}%`);
            
            if (elapsed >= totalDuration) {
                clearInterval(this.timelineInterval);
                this.timelineInterval = null;
            }
        }, 100 / this.animationSpeed);
    }
    
    resetTimeline() {
        const timeline = document.getElementById('timeline');
        if (timeline) {
            timeline.style.setProperty('--progress', '0%');
        }
    }
    
    completeAnimation() {
        this.isPlaying = false;
        this.isPaused = false;
        this.updateControls();
        
        // Mostrar notificación de completado
        this.showNotification('¡Animación Completada!', 'El flujo de dinero ha sido procesado exitosamente.');
        
        // Resetear después de un momento
        setTimeout(() => {
            this.resetAnimation();
        }, 3000);
    }
    
    updateControls() {
        const playBtn = document.getElementById('play-btn');
        const pauseBtn = document.getElementById('pause-btn');
        const resetBtn = document.getElementById('reset-btn');
        
        if (playBtn) {
            playBtn.disabled = this.isPlaying && !this.isPaused;
            playBtn.textContent = this.isPaused ? '▶️ Reanudar' : '▶️ Reproducir';
        }
        
        if (pauseBtn) {
            pauseBtn.disabled = !this.isPlaying || this.isPaused;
        }
        
        if (resetBtn) {
            resetBtn.disabled = false;
        }
    }
    
    resetVisualElements() {
        // Resetear flecha con animación suave
        const arrowContainer = document.querySelector('.arrow-container');
        const flowArrow = document.querySelector('.flow-arrow');
        const processingSpinner = document.querySelector('.processing-spinner');
        
        if (arrowContainer) {
            arrowContainer.classList.remove('move-to-totalcoin', 'move-to-user', 'move-from-user', 'move-to-bank', 'move-to-client', 'move-bank-to-user', 'processing', 'move-totalcoin-to-client', 'move-totalcoin-to-bank', 'move-totalcoin-to-user');
            arrowContainer.classList.add('returning-to-center');
            
            // Remover la clase después de la animación
            setTimeout(() => {
                arrowContainer.classList.remove('returning-to-center');
            }, 300);
        }
        
        if (flowArrow) {
            flowArrow.classList.remove('active');
        }
        
        // Resetear spinner
        if (processingSpinner) {
            processingSpinner.classList.remove('active');
        }
        
        // Resetear elementos del sistema
        document.querySelectorAll('.system-element').forEach(element => {
            element.classList.remove('active');
        });
        
        // Resetear indicadores
        document.querySelectorAll('.timeline-step').forEach(step => {
            step.classList.remove('active', 'completed');
        });
        console.log('Timeline reseteado');
        
        // Ocultar notificaciones
        const popup = document.getElementById('notification-popup');
        if (popup) {
            popup.classList.remove('show');
        }
    }
    
    updateInfoSection() {
        const infoSection = document.getElementById('animation-info');
        if (!infoSection) return;
        
        const flowInfo = integrationInfo[this.currentFlow];
        const steps = this.flowSteps[this.currentFlow];
        
        infoSection.innerHTML = `
            <h4>${flowInfo.title}</h4>
            <p>${flowInfo.description}</p>
            <div class="steps-preview">
                <h5>Pasos del proceso:</h5>
                <ol>
                    ${steps.map(step => `<li>${step.name}</li>`).join('')}
                </ol>
            </div>
        `;
    }
}

// Inicializar la animación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Esperar un poco para asegurar que otros elementos estén inicializados
    setTimeout(() => {
        window.moneyFlowAnimation = new MoneyFlowAnimation();
    }, 500);
});