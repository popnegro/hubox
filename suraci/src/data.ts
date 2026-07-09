import { Franchise, Prospect, Manual, Course, SystemAlert, GlobalKPIs } from './types';

export const GLOBAL_KPIs: GlobalKPIs = {
  brandsCount: 130,
  franchisesCount: 480,
  locationsCount: 900,
  usersCount: 850,
  ticketsCount: 1200,
  auditsCount: 320,
  coursesCount: 650,
  projectsCount: 45
};

export const MOCK_ALERTS: SystemAlert[] = [
  {
    id: 'alt-1',
    title: 'Desvío crítico en auditoría bromatológica',
    type: 'alert',
    franchise: 'Suraci Café - Palermo Soho',
    time: 'Hace 10 min'
  },
  {
    id: 'alt-2',
    title: 'Nueva solicitud de franquicia calificada',
    type: 'success',
    franchise: 'CRM Comercial (Inversor Mendoza)',
    time: 'Hace 45 min'
  },
  {
    id: 'alt-3',
    title: 'Alerta de vencimiento de contrato social',
    type: 'warning',
    franchise: 'La Cabrera - Puerto Madero II',
    time: 'Hace 2 horas'
  },
  {
    id: 'alt-4',
    title: 'Capacitación obligatoria aprobada (100% staff)',
    type: 'info',
    franchise: 'Suraci Pizza - Córdoba Centro',
    time: 'Hace 4 horas'
  }
];

export const MOCK_BRANDS = [
  { id: 'b-1', name: 'Suraci Café', category: 'Gastronomía (Cafetería)', activeFranchises: 45, totalLocations: 82 },
  { id: 'b-2', name: 'Suraci Pizza & Birra', category: 'Gastronomía (Fast Casual)', activeFranchises: 32, totalLocations: 64 },
  { id: 'b-3', name: 'Le Ble Boulangerie', category: 'Gastronomía (Panadería)', activeFranchises: 28, totalLocations: 55 },
  { id: 'b-4', name: 'Nails & Hair Studio', category: 'Estética & Cuidado', activeFranchises: 15, totalLocations: 30 },
  { id: 'b-5', name: 'Fitness & Health Club', category: 'Bienestar & Deporte', activeFranchises: 10, totalLocations: 19 }
];

export const MOCK_FRANCHISES: Franchise[] = [
  {
    id: 'f-1',
    name: 'Suraci Café - Palermo Soho',
    brandId: 'b-1',
    brandName: 'Suraci Café',
    owner: 'Guillermo Albornoz',
    ownerEmail: 'g.albornoz@suracicafe.com',
    ownerPhone: '+54 9 11 5834-9210',
    location: 'CABA, Argentina',
    status: 'active',
    startYear: 2022,
    openingsPending: 0,
    complianceScore: 94,
    monthlySales: 18500000, // ARS
    checklistProgress: 100,
    checklist: [
      { id: 'cl-1', task: 'Habilitación municipal definitiva', completed: true, dueDate: '2022-03-10', assignee: 'Guillermo Albornoz' },
      { id: 'cl-2', task: 'Firma de contrato de franquicia por 5 años', completed: true, dueDate: '2022-02-15', assignee: 'Estudio Suraci Legal' },
      { id: 'cl-3', task: 'Capacitación inicial del personal de barra', completed: true, dueDate: '2022-04-01', assignee: 'Consultora Suraci RRHH' }
    ],
    timeline: [
      { id: 't-1', title: 'Auditoría Bromatológica Aprobada', date: '2026-06-15', type: 'audit', description: 'Puntuación técnica de 96/100 sin observaciones críticas.', status: 'completed' },
      { id: 't-2', title: 'Ticket de Mantenimiento de Cafetera', date: '2026-06-28', type: 'ticket', description: 'Reemplazo de junta de portafiltro del grupo 2 realizado.', status: 'completed' },
      { id: 't-3', title: 'Curso de Liderazgo para Encargados', date: '2026-07-05', type: 'training', description: 'Completado con honores por el encargado de local.', status: 'completed' }
    ],
    documents: [
      { id: 'doc-1', name: 'Contrato_Franquicia_PalermoSoho_Firmado.pdf', category: 'legal', uploadedAt: '2022-02-18', size: '4.2 MB' },
      { id: 'doc-2', name: 'Auditoria_Presencial_Calidad_Junio2026.pdf', category: 'audit', uploadedAt: '2026-06-16', size: '1.8 MB' },
      { id: 'doc-3', name: 'Certificado_Habilitacion_Sanitaria.pdf', category: 'legal', uploadedAt: '2022-03-12', size: '840 KB' }
    ],
    tickets: [
      { id: 'tk-1', code: 'TK-4820', title: 'Falla en terminal de cobros Posnet', category: 'infrastructure', priority: 'medium', status: 'resolved', createdAt: '2026-07-01', franchiseName: 'Suraci Café - Palermo Soho' },
      { id: 'tk-2', code: 'TK-4901', title: 'Solicitud de material POP Primavera', category: 'marketing', priority: 'low', status: 'open', createdAt: '2026-07-07', franchiseName: 'Suraci Café - Palermo Soho' }
    ]
  },
  {
    id: 'f-2',
    name: 'Suraci Pizza - Belgrano C',
    brandId: 'b-2',
    brandName: 'Suraci Pizza & Birra',
    owner: 'Mariana Rosas',
    ownerEmail: 'mrosas@pizzasuraci.com',
    ownerPhone: '+54 9 11 3022-8756',
    location: 'CABA, Argentina',
    status: 'warning',
    startYear: 2024,
    openingsPending: 1,
    complianceScore: 78,
    monthlySales: 14200000,
    checklistProgress: 75,
    checklist: [
      { id: 'cl-4', task: 'Instalación de sistema de extracción homologado', completed: true, dueDate: '2024-05-10', assignee: 'Mariana Rosas' },
      { id: 'cl-5', task: 'Validación de seguro de responsabilidad civil', completed: true, dueDate: '2024-05-15', assignee: 'Mariana Rosas' },
      { id: 'cl-6', task: 'Certificación de manipulación de alimentos (Staff)', completed: false, dueDate: '2026-07-20', assignee: 'Consultora Suraci RRHH' }
    ],
    timeline: [
      { id: 't-4', title: 'Auditoría de Procesos de Cocina', date: '2026-05-10', type: 'audit', description: 'Se detectaron demoras en tiempos de despacho promedio.', status: 'alert' },
      { id: 't-5', title: 'Alta de Ticket por Demoras de Proveedor de Harina', date: '2026-07-01', type: 'ticket', description: 'Retraso recurrente en la entrega de materia prima crítica.', status: 'pending' }
    ],
    documents: [
      { id: 'doc-4', name: 'Contrato_Franquicia_Belgrano_Firmado.pdf', category: 'legal', uploadedAt: '2024-04-10', size: '4.1 MB' },
      { id: 'doc-5', name: 'Plano_De_Cocina_Aprobado.pdf', category: 'infrastructure', uploadedAt: '2024-04-12', size: '2.5 MB' }
    ],
    tickets: [
      { id: 'tk-3', code: 'TK-4912', title: 'Demora recurrente en entrega de Harina 0000', category: 'operations', priority: 'high', status: 'in_progress', createdAt: '2026-07-02', franchiseName: 'Suraci Pizza - Belgrano C' }
    ]
  },
  {
    id: 'f-3',
    name: 'Suraci Café - Mendoza Quinta Sección',
    brandId: 'b-1',
    brandName: 'Suraci Café',
    owner: 'Federico Lucero',
    ownerEmail: 'f.lucero@suracicafe.com',
    ownerPhone: '+54 9 261 459-9902',
    location: 'Mendoza, Argentina',
    status: 'active',
    startYear: 2023,
    openingsPending: 0,
    complianceScore: 97,
    monthlySales: 16800000,
    checklistProgress: 100,
    checklist: [
      { id: 'cl-7', task: 'Habilitación municipal', completed: true, dueDate: '2023-08-01', assignee: 'Federico Lucero' },
      { id: 'cl-8', task: 'Capacitación en Software de Ventas', completed: true, dueDate: '2023-08-05', assignee: 'Federico Lucero' }
    ],
    timeline: [
      { id: 't-6', title: 'Premio a la Excelencia Operativa', date: '2026-04-12', type: 'milestone', description: 'Mejor puntuación del trimestre en auditorías de experiencia al cliente.', status: 'completed' }
    ],
    documents: [
      { id: 'doc-6', name: 'Contrato_Mendoza_Quinta_Firmado.pdf', category: 'legal', uploadedAt: '2023-07-15', size: '4.5 MB' }
    ],
    tickets: []
  },
  {
    id: 'f-4',
    name: 'Nails Studio - Córdoba Cerro',
    brandId: 'b-4',
    brandName: 'Nails & Hair Studio',
    owner: 'Sofia Santini',
    ownerEmail: 'ssantini@nailsstudio.com',
    ownerPhone: '+54 9 351 234-9811',
    location: 'Córdoba, Argentina',
    status: 'pending',
    startYear: 2026,
    openingsPending: 1,
    complianceScore: 60,
    monthlySales: 0,
    checklistProgress: 45,
    checklist: [
      { id: 'cl-9', task: 'Elección y aprobación del local comercial', completed: true, dueDate: '2026-05-15', assignee: 'Sofia Santini' },
      { id: 'cl-10', task: 'Obra de Adecuación de Imagen Corporativa', completed: false, dueDate: '2026-08-10', assignee: 'Arquitectura Suraci' },
      { id: 'cl-11', task: 'Entrega de Mobiliario y Equipamiento Técnico', completed: false, dueDate: '2026-08-20', assignee: 'Logística Suraci' },
      { id: 'cl-12', task: 'Capacitación del Staff en técnicas Nails & Spa', completed: false, dueDate: '2026-09-01', assignee: 'Universidad Suraci' }
    ],
    timeline: [
      { id: 't-7', title: 'Reserva de Zona Comercial Firmada', date: '2026-05-01', type: 'milestone', description: 'Exclusividad asignada para zona Cerro de las Rosas.', status: 'completed' },
      { id: 't-8', title: 'Lanzamiento de Proyecto de Obra', date: '2026-05-20', type: 'milestone', description: 'Planos aprobados por el equipo de diseño corporativo.', status: 'completed' }
    ],
    documents: [
      { id: 'doc-7', name: 'Exclusividad_Zona_CerroDeLasRosas.pdf', category: 'legal', uploadedAt: '2026-05-02', size: '1.2 MB' },
      { id: 'doc-8', name: 'Layout_Arquitectura_Aprobado.pdf', category: 'infrastructure', uploadedAt: '2026-05-22', size: '12.4 MB' }
    ],
    tickets: [
      { id: 'tk-4', code: 'TK-4919', title: 'Retraso de aduana en importación de esmaltes primarios', category: 'operations', priority: 'high', status: 'open', createdAt: '2026-07-06', franchiseName: 'Nails Studio - Córdoba Cerro' }
    ]
  }
];

export const MOCK_PROSPECTS: Prospect[] = [
  {
    id: 'p-1',
    name: 'Carlos Menéndez',
    email: 'carlos.m@inversionesandinas.com',
    phone: '+54 9 261 684-2103',
    city: 'Mendoza',
    brandInterest: 'Suraci Café',
    investmentBudget: 'USD 85.000',
    stage: 'contract',
    status: 'active',
    company: 'Inversiones Andinas S.A.',
    notes: [
      { id: 'n-1', author: 'Consultor Exp. Juan Pérez', date: '2026-06-18', text: 'Excelente perfil de inversor. Busca multilocales en zona Godoy Cruz y Chacras.' },
      { id: 'n-2', author: 'Legal - Estudio Suraci', date: '2026-07-01', text: 'Borrador de contrato de franquicia enviado para revisión de sus abogados.' }
    ],
    activities: [
      { id: 'act-1', type: 'meeting', title: 'Reunión de devolución de contrato comercial', date: '2026-07-12', completed: false },
      { id: 'act-2', type: 'call', title: 'Llamar para coordinar visita a local modelo Palermo', date: '2026-06-25', completed: true }
    ]
  },
  {
    id: 'p-2',
    name: 'Estela Maris Vázquez',
    email: 'estelav@vazquezgastro.com',
    phone: '+54 9 341 532-1188',
    city: 'Rosario',
    brandInterest: 'Le Ble Boulangerie',
    investmentBudget: 'USD 110.000',
    stage: 'meeting',
    status: 'active',
    company: 'Vázquez & Asociados Gastronómicos',
    notes: [
      { id: 'n-3', author: 'Socio Director Suraci', date: '2026-06-29', text: 'Muy interesada en dominar el corredor norte de Rosario. Operadora de marcas locales con experiencia.' }
    ],
    activities: [
      { id: 'act-3', type: 'meeting', title: 'Presentación de Plan de Expansión Territorial', date: '2026-07-09', completed: false }
    ]
  },
  {
    id: 'p-3',
    name: 'Ignacio Larreta',
    email: 'ignacio@larretaproperties.com',
    phone: '+54 9 11 4099-2810',
    city: 'San Isidro',
    brandInterest: 'Suraci Pizza & Birra',
    investmentBudget: 'USD 90.000',
    stage: 'qualification',
    status: 'active',
    company: 'Larreta Desarrollos',
    notes: [
      { id: 'n-4', author: 'Analista de Expansión', date: '2026-07-03', text: 'Cuenta con local propio en esquina clave de Martínez. Evaluando factibilidad técnica de cocina.' }
    ],
    activities: [
      { id: 'act-4', type: 'task', title: 'Análisis de viabilidad técnica del local de San Isidro', date: '2026-07-15', completed: false }
    ]
  },
  {
    id: 'p-4',
    name: 'Roberto Gómez',
    email: 'roberto@gomezgrup.com',
    phone: '+54 9 351 889-1234',
    city: 'Córdoba Capital',
    brandInterest: 'Fitness & Health Club',
    investmentBudget: 'USD 150.000',
    stage: 'won',
    status: 'active',
    company: 'Gómez Sport Group',
    notes: [
      { id: 'n-5', author: 'Consultor Exp. Juan Pérez', date: '2026-05-10', text: 'Contrato firmado. Comienza etapa de adecuación técnica y preventa de membresías.' }
    ],
    activities: [
      { id: 'act-5', type: 'email', title: 'Envío de manuales de arquitectura y planos base', date: '2026-05-15', completed: true }
    ]
  }
];

export const MOCK_MANUALS: Manual[] = [
  {
    id: 'm-1',
    title: 'Manual de Operaciones y Procesos Diarios',
    category: 'operation',
    summary: 'Guía de estandarización sobre la apertura, operación, servicio de atención, despacho, cierre de caja y auditoría diaria de locales.',
    lastUpdated: '2026-05-10',
    pages: [
      {
        title: 'Apertura y Check de Higiene',
        content: `El proceso de apertura comienza exactamente **60 minutos antes** de la hora de apertura al público.

### Pasos Críticos:
1. **Inspección Visual Externa:** Verificar que no haya grafitis o suciedad en la fachada.
2. **Encendido de Equipos:** Cafeteras, hornos y sistemas POS. Las cafeteras requieren 25 minutos para lograr la presión óptima de 9 bar.
3. **Control de Temperaturas:** Heladeras de refrigeración deben marcar entre 2°C y 5°C. Freezers deben marcar entre -18°C y -22°C. Registrar valores en la planilla diaria.`
      },
      {
        title: 'Estandarización del Servicio',
        content: `La experiencia del cliente Suraci se basa en 3 pilares: **Calidez, Agilidad y Consistencia**.

### Protocolo de Saludo:
- "Bienvenido a Suraci Café, ¿cómo estás hoy?" con contacto visual directo y una sonrisa genuina.
- Tiempo máximo de espera en fila: 3 minutos.
- Tiempo de entrega de pedido: 4 minutos para cafetería, 8 minutos para opciones calientes de cocina.`
      }
    ]
  },
  {
    id: 'm-2',
    title: 'Manual de Imagen de Marca & Visual Merchandising',
    category: 'marketing',
    summary: 'Directrices de uso de logotipos, colores institucionales, uniformes de staff, orden de vitrinas, música de ambiente y campañas POP.',
    lastUpdated: '2026-04-18',
    pages: [
      {
        title: 'Distribución de Vitrinas',
        content: `La vitrina de exhibición de pastelería debe mantener una regla de **3 niveles de altura**:
- **Nivel Superior (Ojo):** Productos de alta rotación y especialidades del día (Macarons, Croissant rellenos).
- **Nivel Medio:** Tortas enteras y porciones de alta rentabilidad.
- **Nivel Inferior:** Bebidas frías embotelladas y sándwiches listos para llevar.`
      }
    ]
  },
  {
    id: 'm-3',
    title: 'Manual de Expansión, Localización & Obra',
    category: 'expansion',
    summary: 'Especificaciones técnicas para la selección de locales comerciales, requisitos de potencia eléctrica, gas, agua, y planos de arquitectura corporativa.',
    lastUpdated: '2026-06-01',
    pages: [
      {
        title: 'Requisitos Técnicos del Local',
        content: `Los locales de Suraci Café deben cumplir los siguientes requisitos mínimos para ser aprobados:
- **Superficie Mínima:** 80 m² cubiertos más espacio para terraza de mesas.
- **Potencia Eléctrica:** Trifásica de 35 kW de capacidad instalada para evitar cortes por uso simultáneo de hornos y climatización.
- **Fachada Mínima:** 6 metros lineales de frente con vidriado de seguridad.`
      }
    ]
  },
  {
    id: 'm-4',
    title: 'Manual de Administración & Control Financiero',
    category: 'administration',
    summary: 'Normativas de facturación, arqueos de caja, reporte mensual de costos directos, pago de regalías y compra de insumos corporativos homologados.',
    lastUpdated: '2026-03-12',
    pages: [
      {
        title: 'Arqueo de Caja y Declaraciones',
        content: `El arqueo de caja se realiza dos veces al día: a las 15:00 hs (cambio de turno) y a las 23:00 hs (cierre).
- El desvío de caja aceptado máximo es de +/- $500 ARS. Cualquier diferencia mayor debe ser asentada y reportada al supervisor zonal mediante ticket.`
      }
    ]
  }
];

export const MOCK_UNIVERSITY_COURSES: Course[] = [
  {
    id: 'c-1',
    title: 'Inducción General a la Cultura Suraci',
    category: 'management',
    duration: '4 horas',
    progress: 100,
    lessonsCount: 6,
    completed: true,
    evaluation: {
      question: '¿Cuál es el tiempo máximo estandarizado de espera en fila para un cliente?',
      options: ['1 minuto', '3 minutos', '5 minutos', '10 minutos'],
      correctIndex: 1,
      score: 100
    }
  },
  {
    id: 'c-2',
    title: 'Protocolo de Barismo y Calidad de Café de Especialidad',
    category: 'barista',
    duration: '8 horas',
    progress: 60,
    lessonsCount: 12,
    completed: false,
    evaluation: {
      question: '¿A qué temperatura de caldera debe operar la máquina de espresso para la extracción óptima?',
      options: ['60°C - 70°C', '90°C - 95°C', '110°C - 120°C', '150°C - 160°C'],
      correctIndex: 1
    }
  },
  {
    id: 'c-3',
    title: 'Atención al Cliente Premium y Fidelización',
    category: 'customer_service',
    duration: '6 horas',
    progress: 10,
    lessonsCount: 8,
    completed: false,
    evaluation: {
      question: '¿Qué acción de recuperación se debe tomar ante una queja por comida fría?',
      options: [
        'Disculparse, retirar el plato, marchar uno nuevo prioritario y bonificar la bebida.',
        'Sugerir que se use el microondas del salón.',
        'Explicar que la cocina está con mucha demanda.',
        'Hacer un descuento del 10% en la próxima visita.'
      ],
      correctIndex: 0
    }
  },
  {
    id: 'c-4',
    title: 'Buenas Prácticas de Manufactura e Higiene (BPM)',
    category: 'kitchen',
    duration: '5 horas',
    progress: 0,
    lessonsCount: 10,
    completed: false,
    evaluation: {
      question: '¿Cuál es la temperatura máxima segura de almacenamiento de alimentos refrigerados?',
      options: ['2°C', '5°C', '10°C', '15°C'],
      correctIndex: 1
    }
  }
];

export const UNIVERSITY_RANKING = [
  { rank: 1, name: 'Suraci Café - Mendoza Quinta', score: 985, progress: '98%' },
  { rank: 2, name: 'Suraci Café - Palermo Soho', score: 942, progress: '94%' },
  { rank: 3, name: 'Le Ble Boulangerie - San Isidro', score: 890, progress: '89%' },
  { rank: 4, name: 'Suraci Pizza - Belgrano C', score: 780, progress: '78%' }
];
