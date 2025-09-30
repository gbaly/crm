-- Check all initial data

-- Users
SELECT '=== USERS ===' AS info;
SELECT "Name", "Email", "Role" FROM "Users";

-- Customers
SELECT '=== CUSTOMERS ===' AS info;
SELECT "Name", "Email", "Phone" FROM "Customers";

-- Products
SELECT '=== PRODUCTS ===' AS info;
SELECT "Name", "Category", "SalePrice", "Stock" FROM "Products";

-- Agents
SELECT '=== AGENTS ===' AS info;
SELECT a."Balance", u."Name" as "AgentName" 
FROM "Agents" a 
JOIN "Users" u ON a."UserId" = u."Id";
