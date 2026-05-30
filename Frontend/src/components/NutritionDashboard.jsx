// src/components/NutritionDashboard.jsx
import React, { useState } from 'react';
import { Activity, Apple, Scale, ActivitySquare, AlertCircle, CheckCircle2, Sun, Moon, Info, Calculator, BookOpen, Sparkles } from 'lucide-react';

const NutritionDashboard = () => {
  const [isDark, setIsDark] = useState(false);

  const [personalData, setPersonalData] = useState({ height: '', weight: '' });
  const [metrics, setMetrics] = useState({ bmi: 0, category: '-', caloricNeeds: 0 });
  const [isBmiCalculated, setIsBmiCalculated] = useState(false);

  const [foodData, setFoodData] = useState({
    calories: '', protein: '', fat: '', carbohydrates: '', fiber: '', sugar: ''
  });
  
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const bmiReference = [
    { id: 'Underweight', label: 'Underweight', range: '< 18.5', color: 'bg-blue-400' },
    { id: 'Normal', label: 'Normal', range: '18.5 - 24.9', color: 'bg-emerald-400' },
    { id: 'Overweight', label: 'Overweight', range: '25.0 - 29.9', color: 'bg-yellow-400' },
    { id: 'Obese', label: 'Obese', range: '30.0 - 34.9', color: 'bg-orange-500' },
    { id: 'Extremely Obese', label: 'Extremely Obese', range: '≥ 35.0', color: 'bg-red-500' }
  ];

  const handleCalculateBMI = () => {
    if (personalData.height > 0 && personalData.weight > 0) {
      const heightInMeters = personalData.height / 100;
      const calculatedBmi = personalData.weight / (heightInMeters * heightInMeters);
      
      let category = '';
      if (calculatedBmi < 18.5) category = 'Underweight';
      else if (calculatedBmi >= 18.5 && calculatedBmi < 25) category = 'Normal';
      else if (calculatedBmi >= 25 && calculatedBmi < 30) category = 'Overweight';
      else if (calculatedBmi >= 30 && calculatedBmi < 35) category = 'Obese';
      else category = 'Extremely Obese';

      const estimatedCalories = Math.round((10 * personalData.weight) + (6.25 * personalData.height) - (5 * 20) + 5);

      setMetrics({ bmi: calculatedBmi.toFixed(1), category, caloricNeeds: estimatedCalories });
      setIsBmiCalculated(true);
      setPrediction(null); 
    }
  };

  const handlePersonalDataChange = (e) => {
    const val = e.target.value;
    setPersonalData({ ...personalData, [e.target.name]: val === '' ? '' : Number(val) });
    setIsBmiCalculated(false); 
  };

  const handleFoodInputChange = (e) => {
    setFoodData({ ...foodData, [e.target.name]: e.target.value });
  };

  const isFoodDataComplete = Object.values(foodData).every(value => value !== '');
  const isReadyToPredict = isBmiCalculated && isFoodDataComplete;

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPrediction(null);

    try {
      setTimeout(() => {
        const isUnhealthy = Number(foodData.sugar) > 15 || Number(foodData.fat) > 20 || Number(foodData.calories) > 500;
        setPrediction(isUnhealthy ? 'Unhealthy' : 'Healthy');
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Gagal menghubungi server ML.');
      setLoading(false);
    }
  };

  // --- DOWNSCALED GLASS STYLES (80% SCALE EFFECT) ---
  const glassCardClasses = "group/card relative bg-white/60 dark:bg-slate-900/50 backdrop-blur-3xl border border-white/80 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_0_rgba(0,0,0,0.1)] dark:hover:shadow-[0_16px_48px_0_rgba(0,0,0,0.6)] rounded-2xl p-5 xl:p-6 transition-all duration-500 ease-out flex flex-col z-10 overflow-hidden hover:-translate-y-1";
  
  const inputClasses = "w-full p-2.5 text-sm bg-white/90 dark:bg-slate-950/80 border-2 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md rounded-xl focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:-translate-y-0.5 hover:border-blue-400 dark:hover:border-blue-500 text-slate-900 dark:text-white placeholder-slate-400 transition-all duration-300 ease-out";

  return (
    <div className={`${isDark ? 'dark' : ''}`}>
      <div className="relative min-h-screen px-4 py-6 md:px-8 md:py-8 lg:px-12 xl:px-16 font-sans transition-colors duration-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col overflow-hidden">
        
        {/* --- LIQUID ORBS --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-[10%] -left-[5%] w-[45rem] h-[45rem] bg-blue-400/40 dark:bg-blue-600/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-70 animate-pulse duration-1000"></div>
          <div className="absolute top-[20%] -right-[5%] w-[40rem] h-[40rem] bg-purple-400/40 dark:bg-purple-600/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-70 animate-pulse duration-700 delay-300"></div>
          <div className="absolute -bottom-[20%] left-[30%] w-[50rem] h-[50rem] bg-blue-300/40 dark:bg-purple-800/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-70 animate-pulse duration-1000 delay-500"></div>
        </div>

        <div className="relative z-10 w-full flex flex-col flex-grow max-w-[1400px] mx-auto">
          
          {/* HEADER DOWNSCALED */}
          <header className="w-full flex justify-between items-center mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="group cursor-pointer">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5 drop-shadow-sm tracking-tight transition-transform duration-500 group-hover:scale-[1.02]">
                <Apple className="h-8 w-8 text-blue-600 dark:text-blue-400 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
                NutriCheck
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5 font-medium transition-colors group-hover:text-purple-600 dark:group-hover:text-purple-400">Pedoman Gizi Seimbang ML Evaluator</p>
            </div>
            
            <button 
              onClick={() => setIsDark(!isDark)}
              className="group flex items-center gap-2.5 p-1.5 sm:pl-4 sm:pr-1.5 sm:py-1.5 rounded-full bg-white/90 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:bg-white dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-600 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
            >
              <span className="hidden sm:inline-block text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-purple-400 transition-colors">
                Tap me to change website theme!
              </span>
              <div className="bg-slate-100 dark:bg-slate-900/80 p-2 rounded-full shadow-sm text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-purple-400 transition-colors">
                {isDark ? <Sun className="h-4 w-4 transition-transform duration-500 group-hover:rotate-90" /> : <Moon className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-12" />}
              </div>
            </button>
          </header>

          <div className="w-full mb-6 p-4 md:p-5 bg-blue-500/10 dark:bg-blue-500/10 border border-blue-500/20 dark:border-white/10 rounded-xl flex items-start gap-4 backdrop-blur-xl shadow-sm hover:shadow-md hover:bg-blue-500/15 transition-all duration-300 group animate-in fade-in slide-in-from-top-8 duration-700 delay-100">
            <Info className="text-blue-600 dark:text-blue-400 mt-0.5 shrink-0 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            <div>
              <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-0.5">Sistem Keputusan Gizi Terpersonalisasi</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Masukkan data fisik Anda dan klik <strong>Hitung BMI</strong>. Model Machine Learning akan mengevaluasi nutrisi makanan berdasarkan <span className="font-semibold text-blue-700 dark:text-blue-400">PMK RI No. 41 Tahun 2014</span>.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 xl:gap-6 w-full items-stretch animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            
            {/* CARD 1: Karakteristik Tubuh */}
            <div className={`${glassCardClasses} lg:col-span-1 h-full`}>
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent dark:from-white/5 pointer-events-none transition-opacity duration-500 group-hover/card:opacity-100 opacity-70"></div>
              
              <h2 className="text-lg font-bold mb-5 flex items-center gap-2 text-slate-900 dark:text-white z-10 group-hover/card:text-blue-600 dark:group-hover/card:text-blue-400 transition-colors">
                <ActivitySquare className="h-5 w-5 text-blue-600 dark:text-blue-400 transition-transform duration-300 group-hover/card:scale-110 group-hover/card:rotate-3" /> Karakteristik Tubuh
              </h2>
              
              <div className="space-y-4 z-10">
                <div className="group/input">
                  <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300 transition-colors group-focus-within/input:text-blue-600 dark:group-focus-within/input:text-blue-400">Tinggi Badan (cm)</label>
                  <input type="number" name="height" placeholder="0" value={personalData.height} onChange={handlePersonalDataChange} className={inputClasses} />
                </div>
                <div className="group/input">
                  <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300 transition-colors group-focus-within/input:text-blue-600 dark:group-focus-within/input:text-blue-400">Berat Badan (kg)</label>
                  <input type="number" name="weight" placeholder="0" value={personalData.weight} onChange={handlePersonalDataChange} className={inputClasses} />
                </div>
                
                <button
                  type="button"
                  onClick={handleCalculateBMI}
                  disabled={!personalData.height || !personalData.weight}
                  className="group/btn w-full mt-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-bold py-2.5 px-4 rounded-xl shadow-md hover:shadow-blue-500/30 active:scale-95 transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-50 disabled:shadow-none disabled:active:scale-100"
                >
                  <Calculator className="h-4 w-4 transition-transform duration-300 group-hover/btn:rotate-12 group-hover/btn:scale-110" /> Hitung BMI
                </button>
              </div>

              {isBmiCalculated && (
                <div className="mt-6 p-4 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-white/60 dark:border-white/5 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-500 ease-out shadow-sm hover:shadow-md transition-shadow z-10 flex-grow flex flex-col justify-end">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">BMI:</span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white animate-in pop-in duration-500">{metrics.bmi}</span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Status:</span>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 shadow-sm border border-blue-200 dark:border-blue-800 animate-in pop-in duration-500 delay-100">
                      {metrics.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-200/80 dark:border-slate-700/80">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Target Kalori:</span>
                    <span className="text-lg font-bold text-purple-600 dark:text-purple-400 animate-in pop-in duration-500 delay-200">{metrics.caloricNeeds} kcal</span>
                  </div>
                </div>
              )}
            </div>

            {/* CARD 2: Referensi BMI */}
            <div className={`${glassCardClasses} lg:col-span-1 h-full`}>
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent dark:from-white/5 pointer-events-none"></div>
              <h2 className="text-lg font-bold mb-5 flex items-center gap-2 text-slate-900 dark:text-white z-10 group-hover/card:text-purple-600 dark:group-hover/card:text-purple-400 transition-colors">
                <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400 transition-transform duration-300 group-hover/card:-translate-y-1" /> Referensi BMI
              </h2>
              <div className="space-y-2.5 flex-grow flex flex-col justify-center z-10">
                {bmiReference.map((item, idx) => {
                  const isActive = isBmiCalculated && metrics.category === item.id;
                  const isDimmed = isBmiCalculated && metrics.category !== item.id;

                  return (
                    <div 
                      key={item.id} 
                      className={`flex items-center justify-between p-2.5 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? 'bg-white dark:bg-slate-800 shadow-md font-bold border border-blue-400 dark:border-blue-500 scale-[1.03] pl-4' 
                          : 'bg-white/80 dark:bg-slate-800/60 shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-white hover:shadow-md dark:hover:bg-slate-700/80 hover:border-blue-300 dark:hover:border-blue-600 hover:pl-4'
                      } ${isDimmed ? 'opacity-40 grayscale-[40%] hover:grayscale-0 hover:opacity-100' : ''}`}
                      style={{ transitionDelay: `${idx * 50}ms` }}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-3 h-3 rounded-full ${item.color} shadow-sm ${isActive ? 'animate-pulse ring-4 ring-current/20' : ''}`}></span>
                        <span className={`text-sm transition-colors ${isActive ? 'text-blue-700 dark:text-blue-400' : 'text-slate-800 dark:text-slate-200'}`}>
                          {item.label}
                        </span>
                      </div>
                      <span className={`text-xs font-mono font-semibold tracking-tighter transition-colors ${isActive ? 'text-blue-600 dark:text-blue-300' : 'text-slate-500 dark:text-slate-400'}`}>
                        {item.range}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CARD 3: Evaluasi Nutrisi */}
            <div className={`${glassCardClasses} lg:col-span-2`}>
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent dark:from-white/5 pointer-events-none"></div>
              
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white z-10 group-hover/card:text-blue-600 dark:group-hover/card:text-blue-400 transition-colors">
                <Scale className="h-5 w-5 text-blue-600 dark:text-blue-400 transition-transform duration-300 group-hover/card:rotate-12" /> Evaluasi Nutrisi Makanan
              </h2>
              
              <form onSubmit={handlePredict} className="flex flex-col z-10">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 xl:gap-5 mb-6">
                  {['calories', 'protein', 'fat', 'carbohydrates', 'fiber', 'sugar'].map((nutrient) => (
                    <div key={nutrient} className="group/input">
                      <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300 capitalize transition-colors group-focus-within/input:text-blue-600 dark:group-focus-within/input:text-blue-400">
                        {nutrient} <span className="opacity-60 text-[10px] font-normal transition-opacity group-focus-within/input:opacity-100">{nutrient === 'calories' ? '(Kcal)' : '(G)'}</span>
                      </label>
                      <input 
                        type="number" 
                        name={nutrient}
                        value={foodData[nutrient]}
                        onChange={handleFoodInputChange}
                        placeholder="0"
                        className={inputClasses}
                      />
                    </div>
                  ))}
                </div>
                
                <div className="mt-3">
                  <button 
                    type="submit" 
                    disabled={loading || !isReadyToPredict}
                    className="group/btn w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-purple-500/30 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:shadow-none disabled:active:scale-100 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                  >
                    {loading ? (
                      <span className="animate-pulse">Menganalisis Data...</span>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 opacity-0 -ml-5 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all duration-300 ease-out" />
                        Evaluasi Makanan (ML)
                      </>
                    )}
                  </button>
                  {!isReadyToPredict && (
                    <p className="text-xs text-center mt-3 text-slate-500 dark:text-slate-400 font-medium transition-opacity duration-300">
                      *Hitung BMI dan lengkapi semua data nutrisi untuk mengaktifkan evaluasi.
                    </p>
                  )}
                </div>
              </form>

              {prediction && (
                <div className="mt-8 pt-8 border-t border-slate-200/80 dark:border-slate-700/50 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out z-10">
                  <div className={`p-6 rounded-2xl border-2 hover:-translate-y-1 transition-transform duration-500 shadow-sm hover:shadow-md ${
                    prediction === 'Healthy' 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-100 shadow-[inset_0_0_20px_rgba(16,185,129,0.1)] hover:shadow-emerald-500/20' 
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-950 dark:text-rose-100 shadow-[inset_0_0_20px_rgba(244,63,94,0.1)] hover:shadow-rose-500/20'
                  }`}>
                    <div className="flex flex-col md:flex-row items-start gap-5">
                      {prediction === 'Healthy' ? (
                        <div className="p-3 bg-emerald-500/20 rounded-xl shrink-0 animate-in zoom-in duration-500 delay-200 shadow-sm border border-emerald-500/30">
                          <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                        </div>
                      ) : (
                        <div className="p-3 bg-rose-500/20 rounded-xl shrink-0 animate-in zoom-in duration-500 delay-200 shadow-sm border border-rose-500/30">
                          <AlertCircle className="h-8 w-8 text-rose-600 dark:text-rose-400" />
                        </div>
                      )}
                      
                      <div className="flex-grow">
                        <h3 className="text-2xl font-black mb-3 tracking-tight animate-in slide-in-from-right-4 duration-500 delay-100">
                          {prediction} Food
                        </h3>
                        
                        <div className="p-5 bg-white/70 dark:bg-slate-900/60 rounded-xl backdrop-blur-md border border-white/70 dark:border-white/10 shadow-sm group/recom hover:bg-white/90 dark:hover:bg-slate-900/80 transition-colors duration-300">
                          <h4 className="text-sm font-bold mb-2 flex items-center gap-2 group-hover/recom:text-purple-600 dark:group-hover/recom:text-purple-400 transition-colors">
                            <Activity className="h-4 w-4 animate-pulse" /> Rekomendasi ML & Gizi Seimbang
                          </h4>
                          <p className="text-sm leading-relaxed opacity-90">
                            Dengan BMI <strong>{metrics.bmi} ({metrics.category})</strong> dan target harian <strong>{metrics.caloricNeeds} kcal</strong>, 
                            {prediction === 'Healthy' 
                              ? ' profil nutrisi makanan ini sangat ideal untuk dimasukkan ke dalam pola makan harianmu.'
                              : ' komposisi makanan ini masuk kategori kurang sehat. Pertimbangkan untuk membatasi porsinya agar nutrisi tetap terkontrol.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <footer className="w-full mt-10 text-center text-xs font-medium text-slate-500/80 dark:text-slate-400/80 border-t border-slate-200/80 dark:border-slate-800 pt-6 z-10 animate-in fade-in duration-1000 delay-500">
            &copy; 2026 NutriCheck - Machine Learning Prediction for Pedoman Gizi Seimbang
          </footer>

        </div>
      </div>
    </div>
  );
};

export default NutritionDashboard;