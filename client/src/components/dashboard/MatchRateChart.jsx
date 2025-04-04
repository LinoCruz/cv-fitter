import React, { useEffect, useRef } from 'react';
import './match-rate-chart.css';

const MatchRateChart = ({ percentage }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.lineWidth = 15;
    ctx.strokeStyle = '#f0f0f0';
    ctx.stroke();
    
    // Calculate end angle for progress arc (subtract π/2 to start from top)
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (percentage / 100) * 2 * Math.PI;
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#2ecc71');  // Green
    gradient.addColorStop(1, '#3498db');  // Blue
    
    // Progress arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.strokeStyle = gradient;
    ctx.stroke();
    
    // Percentage text
    ctx.font = 'bold 48px Arial';
    ctx.fillStyle = '#2c3e50';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${percentage}%`, centerX, centerY);
    
    // Draw small indicator at the end of the arc
    const indicatorX = centerX + Math.cos(endAngle) * radius;
    const indicatorY = centerY + Math.sin(endAngle) * radius;
    
    ctx.beginPath();
    ctx.arc(indicatorX, indicatorY, 6, 0, 2 * Math.PI);
    ctx.fillStyle = '#f39c12';  // Yellow indicator
    ctx.fill();
  }, [percentage]);

  return (
    <div className="match-rate-chart">
      <canvas ref={canvasRef} width={200} height={200}></canvas>
    </div>
  );
};

export default MatchRateChart;