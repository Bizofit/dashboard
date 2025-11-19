# Unified Dashboard

A modern, responsive, and interactive unified dashboard built with HTML, CSS, and JavaScript. This dashboard provides a centralized view of key metrics, analytics, reports, and settings.

## Features

- **📊 Overview Dashboard**: View key performance metrics at a glance
- **📈 Real-time Stats**: Live updating statistics with animated counters
- **🎨 Modern UI**: Clean, professional design with gradient effects
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **⚡ Fast & Lightweight**: No heavy frameworks - pure HTML, CSS, and JavaScript
- **🔄 Auto-refresh**: Data updates automatically every 5 seconds
- **⌨️ Keyboard Shortcuts**: Quick navigation with Alt + 1-4 keys
- **🎯 Interactive Elements**: Hover effects, animations, and click interactions

## Dashboard Sections

### 1. Overview
- Real-time statistics cards (Users, Revenue, Growth Rate, Sessions)
- Performance metrics chart
- User distribution visualization
- Recent transactions table

### 2. Analytics
- Advanced analytics insights (Coming soon)
- Data trends and patterns

### 3. Reports
- Report generation tools (Coming soon)
- Export options for PDF, CSV, Excel

### 4. Settings
- Dashboard theme customization
- Notification preferences
- Auto-refresh settings

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/Bizofit/dashboard.git
cd dashboard
```

2. Open `index.html` in your web browser:
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

Or simply double-click the `index.html` file.

## File Structure

```
dashboard/
├── index.html      # Main HTML structure
├── styles.css      # All styling and responsive design
├── script.js       # Interactive functionality and animations
└── README.md       # Documentation
```

## Keyboard Shortcuts

- **Alt + 1**: Switch to Overview tab
- **Alt + 2**: Switch to Analytics tab
- **Alt + 3**: Switch to Reports tab
- **Alt + 4**: Switch to Settings tab

## Customization

### Change Theme Colors

Edit the gradient colors in `styles.css`:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Modify Stats

Update the statistics in `index.html` within the `.stat-card` elements.

### Add New Widgets

Create new card elements following the existing structure in the HTML file.

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## Features in Detail

### Real-time Updates
The dashboard simulates real-time data updates every 5 seconds, with smooth animations when values change.

### Responsive Layout
- Desktop: Full three-column layout with sidebar
- Tablet: Adjusted layout with responsive grid
- Mobile: Single-column stacked layout

### Interactive Charts
- Bar charts with hover effects
- Pie chart with segment visualization
- Animated data transitions

## Future Enhancements

- [ ] Backend API integration
- [ ] User authentication
- [ ] Advanced charting with Chart.js/D3.js
- [ ] Dark mode toggle
- [ ] Export functionality for reports
- [ ] Customizable widgets
- [ ] Real-time notifications
- [ ] Multi-language support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Built with ❤️ for unified dashboard needs**