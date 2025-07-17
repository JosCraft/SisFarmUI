export const mockUsers = [
  {
    id: 1,
    username: "admin",
    password_hash: "hashed_password_1",
    full_name: "Juan Pérez",
    phone: "555-1234",
    address: "Calle Falsa 123, Ciudad",
    role_id: 1,
    status: true,
    created_at: "2023-01-15T10:00:00Z",
  },
  {
    id: 2,
    username: "empleado1",
    password_hash: "hashed_password_2",
    full_name: "María García",
    phone: "555-5678",
    address: "Avenida Siempre Viva 456, Pueblo",
    role_id: 2,
    status: true,
    created_at: "2023-02-20T11:30:00Z",
  },
  {
    id: 3,
    username: "farmaceutico",
    password_hash: "hashed_password_3",
    full_name: "Carlos Ruiz",
    phone: "555-9012",
    address: "Plaza Mayor 789, Villa",
    role_id: 3,
    status: true,
    created_at: "2023-03-01T09:15:00Z",
  },
  {
    id: 4,
    username: "empleado2",
    password_hash: "hashed_password_4",
    full_name: "Ana López",
    phone: "555-3456",
    address: "Calle del Sol 101, Ciudad",
    role_id: 2,
    status: false,
    created_at: "2023-04-10T14:00:00Z",
  },
  {
    id: 5,
    username: "supervisor",
    password_hash: "hashed_password_5",
    full_name: "Pedro Martínez",
    phone: "555-7890",
    address: "Bulevar de la Luna 202, Pueblo",
    role_id: 1,
    status: true,
    created_at: "2023-05-05T16:45:00Z",
  },
  {
    id: 6,
    username: "tecnico",
    password_hash: "hashed_password_6",
    full_name: "Sofía Hernández",
    phone: "555-2345",
    address: "Callejón del Gato 303, Villa",
    role_id: 2,
    status: true,
    created_at: "2023-06-12T08:00:00Z",
  },
  {
    id: 7,
    username: "recepcionista",
    password_hash: "hashed_password_7",
    full_name: "Diego Sánchez",
    phone: "555-6789",
    address: "Avenida Central 404, Ciudad",
    role_id: 2,
    status: true,
    created_at: "2023-07-21T13:00:00Z",
  },
  {
    id: 8,
    username: "contable",
    password_hash: "hashed_password_8",
    full_name: "Laura Díaz",
    phone: "555-0123",
    address: "Ronda del Río 505, Pueblo",
    role_id: 1,
    status: true,
    created_at: "2023-08-01T10:00:00Z",
  },
  {
    id: 9,
    username: "practicante",
    password_hash: "hashed_password_9",
    full_name: "Miguel Torres",
    phone: "555-4567",
    address: "Calle de la Paz 606, Villa",
    role_id: 2,
    status: false,
    created_at: "2023-09-09T11:00:00Z",
  },
  {
    id: 10,
    username: "gerente",
    password_hash: "hashed_password_10",
    full_name: "Isabel Vargas",
    phone: "555-8901",
    address: "Paseo de las Flores 707, Ciudad",
    role_id: 1,
    status: true,
    created_at: "2023-10-18T15:00:00Z",
  },
];

export const paymentTypes = ["efectivo", "tarjeta", "transferencia", "credito"]
export const purchaseStatuses = ["pendiente", "completada", "cancelada"]

export const mockPurchaseItems = [
  {
    id: 1,
    purchase_id: 1,
    product_id: 1, // Paracetamol 500mg
    quantity: 100,
    unit_price: 4.5,
    subtotal: 450.0,
    expiration_date: "2025-12-31",
    batch_code: "BATCH001",
  },
  {
    id: 2,
    purchase_id: 1,
    product_id: 3, // Vitamina C 1000mg
    quantity: 50,
    unit_price: 7.0,
    subtotal: 350.0,
    expiration_date: "2026-06-30",
    batch_code: "BATCH002",
  },
  {
    id: 3,
    purchase_id: 2,
    product_id: 2, // Amoxicilina 250mg/5ml
    quantity: 20,
    unit_price: 10.0,
    subtotal: 200.0,
    expiration_date: "2024-11-15",
    batch_code: "BATCH003",
  },
  {
    id: 4,
    purchase_id: 3,
    product_id: 5, // Crema Hidratante 200g
    quantity: 30,
    unit_price: 13.0,
    subtotal: 390.0,
    expiration_date: "2025-09-30",
    batch_code: "BATCH004",
  },
  {
    id: 5,
    purchase_id: 4,
    product_id: 4, // Ibuprofeno 400mg
    quantity: 80,
    unit_price: 6.0,
    subtotal: 480.0,
    expiration_date: "2025-03-20",
    batch_code: "BATCH005",
  },
  {
    id: 6,
    purchase_id: 4,
    product_id: 6, // Omeprazol 20mg
    quantity: 40,
    unit_price: 8.5,
    subtotal: 340.0,
    expiration_date: "2026-01-10",
    batch_code: "BATCH006",
  },
  {
    id: 7,
    purchase_id: 5,
    product_id: 7, // Termómetro Digital
    quantity: 10,
    unit_price: 20.0,
    subtotal: 200.0,
    expiration_date: "2027-01-01",
    batch_code: "BATCH007",
  },
  {
    id: 8,
    purchase_id: 5,
    product_id: 8, // Alcohol Antiséptico 70%
    quantity: 150,
    unit_price: 2.5,
    subtotal: 375.0,
    expiration_date: "2025-07-01",
    batch_code: "BATCH008",
  },
]

export const mockPurchases = [
  {
    id: 1,
    provider_id: 1, // Distribuidora Farmacéutica S.A.
    user_id: 1, // admin
    total: 800.0, // 450 + 350
    payment_type: "tarjeta",
    status: "completada",
    created_at: "2023-11-01T10:00:00Z",
    items: mockPurchaseItems.filter((item) => item.purchase_id === 1),
  },
  {
    id: 2,
    provider_id: 2, // Laboratorios Salud Total Ltda.
    user_id: 2, // empleado1
    total: 200.0,
    payment_type: "efectivo",
    status: "pendiente",
    created_at: "2023-11-05T11:30:00Z",
    items: mockPurchaseItems.filter((item) => item.purchase_id === 2),
  },
  {
    id: 3,
    provider_id: 1, // Distribuidora Farmacéutica S.A.
    user_id: 1, // admin
    total: 390.0,
    payment_type: "transferencia",
    status: "completada",
    created_at: "2023-11-10T09:00:00Z",
    items: mockPurchaseItems.filter((item) => item.purchase_id === 3),
  },
  {
    id: 4,
    provider_id: 3, // Medicamentos Express C.A.
    user_id: 3, // farmaceutico
    total: 820.0, // 480 + 340
    payment_type: "credito",
    status: "pendiente",
    created_at: "2023-11-15T14:00:00Z",
    items: mockPurchaseItems.filter((item) => item.purchase_id === 4),
  },
  {
    id: 5,
    provider_id: 4, // Insumos Médicos del Sur
    user_id: 2, // empleado1
    total: 575.0, // 200 + 375
    payment_type: "efectivo",
    status: "completada",
    created_at: "2023-11-20T16:00:00Z",
    items: mockPurchaseItems.filter((item) => item.purchase_id === 5),
  },
  {
    id: 6,
    provider_id: 5, // Farmaco Global S.R.L.
    user_id: 1, // admin
    total: 150.0,
    payment_type: "tarjeta",
    status: "pendiente",
    created_at: "2023-11-25T08:00:00Z",
    items: [], // Ejemplo de compra sin ítems aún
  },
]
