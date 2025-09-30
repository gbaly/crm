-- CRM System Database Setup Script
-- Run this script in pgAdmin or psql

-- Create database (run this separately or from postgres database)
-- CREATE DATABASE crm_system;

-- Connect to crm_system database, then run the rest:

-- Drop existing tables if they exist (for fresh start)
DROP TABLE IF EXISTS "AuditLogs" CASCADE;
DROP TABLE IF EXISTS "Commissions" CASCADE;
DROP TABLE IF EXISTS "ServiceRequests" CASCADE;
DROP TABLE IF EXISTS "Payments" CASCADE;
DROP TABLE IF EXISTS "SaleItems" CASCADE;
DROP TABLE IF EXISTS "Sales" CASCADE;
DROP TABLE IF EXISTS "Products" CASCADE;
DROP TABLE IF EXISTS "Customers" CASCADE;
DROP TABLE IF EXISTS "Agents" CASCADE;
DROP TABLE IF EXISTS "Users" CASCADE;

-- Create Users table
CREATE TABLE "Users" (
    "Id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "Name" VARCHAR(100) NOT NULL,
    "Email" VARCHAR(100) UNIQUE NOT NULL,
    "PasswordHash" TEXT NOT NULL,
    "Role" INTEGER NOT NULL,
    "IsActive" BOOLEAN DEFAULT TRUE,
    "CreatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP,
    "IsDeleted" BOOLEAN DEFAULT FALSE
);

-- Create Agents table
CREATE TABLE "Agents" (
    "Id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "UserId" UUID NOT NULL UNIQUE,
    "Balance" DECIMAL(18,2) DEFAULT 0,
    "AssignedLicenses" INTEGER DEFAULT 0,
    "SoldLicenses" INTEGER DEFAULT 0,
    "CreatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP,
    "IsDeleted" BOOLEAN DEFAULT FALSE,
    FOREIGN KEY ("UserId") REFERENCES "Users"("Id")
);

-- Create Customers table
CREATE TABLE "Customers" (
    "Id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "Name" VARCHAR(100) NOT NULL,
    "Email" VARCHAR(100) UNIQUE NOT NULL,
    "Phone" VARCHAR(20) NOT NULL,
    "Address" TEXT,
    "TotalPurchases" DECIMAL(18,2) DEFAULT 0,
    "CreatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP,
    "IsDeleted" BOOLEAN DEFAULT FALSE
);

-- Create Products table
CREATE TABLE "Products" (
    "Id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "Name" VARCHAR(100) NOT NULL,
    "Description" TEXT,
    "Category" VARCHAR(50) NOT NULL,
    "CostPrice" DECIMAL(18,2) NOT NULL,
    "SalePrice" DECIMAL(18,2) NOT NULL,
    "Stock" INTEGER NOT NULL,
    "MinStock" INTEGER DEFAULT 0,
    "CreatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP,
    "IsDeleted" BOOLEAN DEFAULT FALSE
);

-- Create Sales table
CREATE TABLE "Sales" (
    "Id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "InvoiceNumber" VARCHAR(50) UNIQUE NOT NULL,
    "CustomerId" UUID NOT NULL,
    "AgentId" UUID,
    "TotalAmount" DECIMAL(18,2) NOT NULL,
    "PaidAmount" DECIMAL(18,2) DEFAULT 0,
    "RemainingAmount" DECIMAL(18,2) NOT NULL,
    "PaymentType" INTEGER NOT NULL,
    "SaleDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "IsPaid" BOOLEAN DEFAULT FALSE,
    "CreatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP,
    "IsDeleted" BOOLEAN DEFAULT FALSE,
    FOREIGN KEY ("CustomerId") REFERENCES "Customers"("Id"),
    FOREIGN KEY ("AgentId") REFERENCES "Agents"("Id")
);

-- Create SaleItems table
CREATE TABLE "SaleItems" (
    "Id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "SaleId" UUID NOT NULL,
    "ProductId" UUID NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "UnitPrice" DECIMAL(18,2) NOT NULL,
    "TotalPrice" DECIMAL(18,2) NOT NULL,
    "CreatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP,
    "IsDeleted" BOOLEAN DEFAULT FALSE,
    FOREIGN KEY ("SaleId") REFERENCES "Sales"("Id") ON DELETE CASCADE,
    FOREIGN KEY ("ProductId") REFERENCES "Products"("Id")
);

-- Create Payments table
CREATE TABLE "Payments" (
    "Id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "SaleId" UUID NOT NULL,
    "Amount" DECIMAL(18,2) NOT NULL,
    "PaymentType" INTEGER NOT NULL,
    "PaymentDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "Reference" TEXT,
    "CreatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP,
    "IsDeleted" BOOLEAN DEFAULT FALSE,
    FOREIGN KEY ("SaleId") REFERENCES "Sales"("Id") ON DELETE CASCADE
);

-- Create ServiceRequests table
CREATE TABLE "ServiceRequests" (
    "Id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "RequestNumber" VARCHAR(50) UNIQUE NOT NULL,
    "CustomerId" UUID NOT NULL,
    "Type" VARCHAR(50) NOT NULL,
    "Description" TEXT NOT NULL,
    "Status" INTEGER DEFAULT 1,
    "RequestDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "CompletedDate" TIMESTAMP,
    "CreatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP,
    "IsDeleted" BOOLEAN DEFAULT FALSE,
    FOREIGN KEY ("CustomerId") REFERENCES "Customers"("Id")
);

-- Create Commissions table
CREATE TABLE "Commissions" (
    "Id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "AgentId" UUID NOT NULL,
    "SaleId" UUID NOT NULL,
    "Type" INTEGER NOT NULL,
    "Rate" DECIMAL(18,2) NOT NULL,
    "Amount" DECIMAL(18,2) NOT NULL,
    "EarnedDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "CreatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP,
    "IsDeleted" BOOLEAN DEFAULT FALSE,
    FOREIGN KEY ("AgentId") REFERENCES "Agents"("Id"),
    FOREIGN KEY ("SaleId") REFERENCES "Sales"("Id")
);

-- Create AuditLogs table
CREATE TABLE "AuditLogs" (
    "Id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "UserId" UUID NOT NULL,
    "UserRole" VARCHAR(50) NOT NULL,
    "Action" VARCHAR(50) NOT NULL,
    "Entity" VARCHAR(50) NOT NULL,
    "EntityId" TEXT,
    "Details" TEXT,
    "IpAddress" VARCHAR(50),
    "Timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "CreatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP,
    "IsDeleted" BOOLEAN DEFAULT FALSE,
    FOREIGN KEY ("UserId") REFERENCES "Users"("Id")
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON "Users"("Email");
CREATE INDEX idx_customers_email ON "Customers"("Email");
CREATE INDEX idx_sales_invoice ON "Sales"("InvoiceNumber");
CREATE INDEX idx_sales_customer ON "Sales"("CustomerId");
CREATE INDEX idx_sales_agent ON "Sales"("AgentId");
CREATE INDEX idx_auditlogs_user ON "AuditLogs"("UserId");
CREATE INDEX idx_auditlogs_timestamp ON "AuditLogs"("Timestamp");

-- Insert default admin user (password: Admin@123)
INSERT INTO "Users" ("Name", "Email", "PasswordHash", "Role", "IsActive")
VALUES (
    'Admin User',
    'admin@crm.com',
    '$2a$11$XwZKqHGKEJVKhYBXGVS3V.yZqN6P6h5wz5LIGhGqL5kYFZ0xOCEWS',
    1,
    TRUE
);

-- Insert default agent user (password: Agent@123)
INSERT INTO "Users" ("Name", "Email", "PasswordHash", "Role", "IsActive")
VALUES (
    'Agent User',
    'agent@crm.com',
    '$2a$11$gVH4nNqYZZ8xGxNYF0Qc6eLj8KOz9hF3YpJm5cV6xT2wL4kS8nE2K',
    2,
    TRUE
);

-- Link agent to user
INSERT INTO "Agents" ("UserId", "Balance", "AssignedLicenses", "SoldLicenses")
SELECT "Id", 1000.00, 10, 0 FROM "Users" WHERE "Email" = 'agent@crm.com';

-- Insert sample customers
INSERT INTO "Customers" ("Name", "Email", "Phone", "Address")
VALUES 
    ('TechCorp Inc', 'info@techcorp.com', '+1234567890', '123 Tech Street, Silicon Valley, CA'),
    ('Digital Solutions Ltd', 'contact@digitalsolutions.com', '+0987654321', '456 Digital Ave, London, UK');

-- Insert sample products
INSERT INTO "Products" ("Name", "Description", "Category", "CostPrice", "SalePrice", "Stock", "MinStock")
VALUES 
    ('CRM Software License', 'Professional CRM software license', 'Software', 50.00, 99.00, 100, 10),
    ('Support Package', 'Annual support and maintenance', 'Service', 100.00, 199.00, 50, 5);

-- Success message
SELECT 'Database setup completed successfully!' AS message;
