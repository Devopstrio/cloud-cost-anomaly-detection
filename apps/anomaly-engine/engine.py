import pandas as pd
import numpy as np
from prophet import Prophet

class AnomalyDetector:
    def __init__(self, data: pd.DataFrame):
        self.data = data # Expected columns: ['ds', 'y'] (Date and Cost)

    def detect_prophet_anomalies(self):
        """
        Detect anomalies using time-series decomposition.
        """
        model = Prophet(interval_width=0.99, daily_seasonality=True)
        model.fit(self.data)
        
        forecast = model.predict(self.data)
        performance = pd.merge(self.data, forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']], on='ds')
        
        performance['anomaly'] = np.where(
            (performance['y'] > performance['yhat_upper']) | 
            (performance['y'] < performance['yhat_lower']), 
            1, 0
        )
        return performance[performance['anomaly'] == 1]

    def detect_zscore_anomalies(self, threshold=3):
        """
        Detect anomalies using standard deviation (Z-Score).
        """
        mean = self.data['y'].mean()
        std = self.data['y'].std()
        
        self.data['z_score'] = (self.data['y'] - mean) / std
        return self.data[np.abs(self.data['z_score']) > threshold]

if __name__ == "__main__":
    # Mock data for demonstration
    dates = pd.date_range(start='2026-01-01', periods=100)
    costs = np.random.normal(1000, 50, 100)
    costs[95] = 5000 # Artificial spike
    
    df = pd.DataFrame({'ds': dates, 'y': costs})
    detector = AnomalyDetector(df)
    
    print("Detecting statistical anomalies...")
    print(detector.detect_zscore_anomalies())
