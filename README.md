# DNS Manager Documentation

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Features

1. **Dashboard:**  
   The dashboard provides an overview of domains and their associated DNS records in a table format. Users can easily upload, view, edit, and delete DNS records.

2. **Supported DNS Record Types:**  
   The system supports various DNS record types, including:
   - A (Address) Record
   - AAAA (IPv6 Address) Record
   - CNAME (Canonical Name) Record
   - MX (Mail Exchange) Record
   - NS (Name Server) Record
   - PTR (Pointer) Record
   - SOA (Start of Authority) Record - Root Domain
   - SRV (Service) Record
   - TXT (Text) Record
   - DS Record

3. **Enhancements:**  
   - Filters and search options for easy data navigation.
   - Integration of CSV or JSON bulk uploads for domain/records data.

# Development Guidelines

- Follow the project's modular design principles.
- Use TypeScript for type-safe development.
- Implement forms and modals for adding, editing, and deleting DNS records.
- Implement secure user authentication and authorization mechanisms using JWT

# Dependencies

- **Vite:** Fast, opinionated web dev build tool.
- **TypeScript:** Typed JavaScript at Any Scale.
- **shadcn/ui:** UI components library for rapid frontend development.

# Resources

- **AWS Route 53:** [https://aws.amazon.com/route53/](https://aws.amazon.com/route53/)



