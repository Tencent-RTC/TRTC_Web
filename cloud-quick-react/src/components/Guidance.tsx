import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import step1Img from '@/assets/image/step1.png';
import step1EnImg from '@/assets/image/step1-en.png';
import step2Img from '@/assets/image/step2.png';
import step2EnImg from '@/assets/image/step2-en.png';
import './Guidance.css';

interface StepItem {
  titleKey: string;
  defaultOpen: boolean;
}

const steps: StepItem[] = [
  { titleKey: 'guide.step1Title', defaultOpen: false },
  { titleKey: 'guide.step2Title', defaultOpen: false },
  { titleKey: 'guide.step3Title', defaultOpen: true },
];

export default function Guidance() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language.startsWith('zh');

  const [openSteps, setOpenSteps] = useState<Record<number, boolean>>(
    steps.reduce((acc, step, index) => ({ ...acc, [index]: step.defaultOpen }), {} as Record<number, boolean>)
  );

  const toggleStep = (index: number) => {
    setOpenSteps((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="guidance-container">
      {/* Step 1 */}
      <div className="guidance-item">
        <button className={`guidance-header ${openSteps[0] ? 'open' : ''}`} onClick={() => toggleStep(0)}>
          <span>{t('guide.step1Title')}</span>
          <span className="guidance-arrow">{openSteps[0] ? '▲' : '▼'}</span>
        </button>
        {openSteps[0] && (
          <div className="guidance-body">
            <ul>
              <li>
                {t('guide.step1Content1')}
              </li>
              <img src={step1Img} alt="step1" style={{ width: 400, maxWidth: '100%' }} />
            </ul>
          </div>
        )}
      </div>

      {/* Step 2 */}
      <div className="guidance-item">
        <button className={`guidance-header ${openSteps[1] ? 'open' : ''}`} onClick={() => toggleStep(1)}>
          <span>{t('guide.step2Title')}</span>
          <span className="guidance-arrow">{openSteps[1] ? '▲' : '▼'}</span>
        </button>
        {openSteps[1] && (
          <div className="guidance-body">
            <ul>
              <li>{t('guide.step2Content')}</li>
              <img src={isZh ? step2Img : step2EnImg} alt="SDKAppId" style={{ width: 400, maxWidth: '100%' }} />
            </ul>
          </div>
        )}
      </div>

      {/* Step 3 */}
      <div className="guidance-item">
        <button className={`guidance-header ${openSteps[2] ? 'open' : ''}`} onClick={() => toggleStep(2)}>
          <span>{t('guide.step3Title')}</span>
          <span className="guidance-arrow">{openSteps[2] ? '▲' : '▼'}</span>
        </button>
        {openSteps[2] && (
          <div className="guidance-body">
            <ul>
              <li>{t('guide.step3Item1')}</li>
              <li>{t('guide.step3Item2')}</li>
              <li>{t('guide.step3Item3')}</li>
              <li>{t('guide.step3Item4')}</li>
              <li>{t('guide.step3Item5')}</li>
              <li>{t('guide.step3Item6')}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
