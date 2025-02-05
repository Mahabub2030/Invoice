
# Dammam Airport Company (DACO) - Invoice System

## Project Overview

The Dammam Airport Company (DACO) Invoice System is a web-based tool designed for comparing commercial offers from various suppliers. The system allows users to enter supplier data, compare pricing, and save historical invoices. It includes features like automatic calculations for VAT and totals, as well as options to download the invoice table in PDF or Excel format.

## Key Features

- **Supplier Comparison Table**:  
  A table to input and compare details for three suppliers, including service number, description, unit, quantity, unit price, and total price.
  
- **Dynamic Calculations**:  
  Automatic calculation of subtotal, VAT (15%), and total price for each supplier based on the entered data.

- **Supplier Names**:  
  Users can input supplier names which will appear in the comparison table header and on downloaded PDF/Excel files.

- **History Tracking**:  
  The ability to save and view previous comparisons, maintaining a historical record of invoices.

- **Download Options**:  
  Export the table as a PDF or Excel file with the calculated values, formatted properly.

## Technologies Used

- **HTML5**: To structure the content of the web page.
- **Tailwind CSS**: For responsive and modern styling of the page.
- **JavaScript**: For dynamic functionality, including calculations and data persistence.
- **jsPDF**: To generate PDF files of the invoice table.
- **xlsx.js**: To export the table data into an Excel file.

## Installation

1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/yourusername/daco-invoice-system.git
    ```

2. Open the `index.html` file in your preferred web browser.

## Usage

### 1. **Input Supplier Data**
   - Enter the names of the suppliers in the text fields provided.
   - Fill in the comparison table with service details, including quantity and unit prices.

### 2. **View and Calculate Data**
   - The system will automatically calculate the subtotal, VAT (15%), and total amount for each supplier.

### 3. **Save History**
   - Click the "Save History" button to save the current comparison for future reference.

### 4. **Download Options**
   - To download the invoice table, use the provided buttons to export it as a PDF or Excel file.

### 5. **Access Historical Data**
   - Click the "History" button to view the saved comparison history on a separate page.

## How to Run Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/daco-invoice-system.git
   ```

2. **Open the Project**:
   - Navigate to the project directory and open `index.html` in any modern web browser to start using the system.

## Contributing

Contributions are welcome! If you have suggestions for improvements or encounter issues, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
