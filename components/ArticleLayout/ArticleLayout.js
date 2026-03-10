'use client';
/* eslint-disable @next/next/no-img-element */

import { SurveyProvider, useSurvey } from '@/context/SurveyContext';
import { pageConfigs } from '@/lib/surveyConfig';
import SurveyModal from '@/components/SurveyModal/SurveyModal';
import StickyBar from '@/components/StickyBar/StickyBar';
import VidalyticsVideo from '@/components/VidalyticsVideo/VidalyticsVideo';
import styles from './ArticleLayout.module.css';
import {
  COMPANY_NAME, OWNER_NAME, LOGO_URL,
  FOUNDER_PHOTO_URL, OWNER_BIO, TRUST_STATS,
  NEWS_VIDEO_1_URL, NEWS_VIDEO_2_URL,
  VIDALYTICS_EMBED_ID, VIDALYTICS_ACCOUNT_ID,
} from '@/lib/config';

function ArticleContent({ categoryBadge, title, subtitle, byline, children }) {
  const { openSurvey } = useSurvey();

  return (
    <>
      <StickyBar />
      <div className={styles.header}>
        <div className={styles.headerInner}>
          {LOGO_URL
            ? <img src={LOGO_URL} alt={COMPANY_NAME} className={styles.logo} />
            : <span className={styles.logoText}>{COMPANY_NAME}</span>
          }
          <div className={styles.publication}>Opinion</div>
        </div>
      </div>
      <article className={styles.article}>
        <div className={styles.articleContent}>
          <div className={styles.categoryBadge}>{categoryBadge}</div>
          <h1>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          <div className={styles.byline} dangerouslySetInnerHTML={{ __html: byline }} />

          {/* Early CTA */}
          <div className={styles.earlyCta}>
            <p className={styles.earlyCtaLabel}>Skip the article. Get your number.</p>
            <h2 className={styles.earlyCtaTitle}>We&apos;ll Beat All Cash Offers</h2>
            <p className={styles.earlyCtaDesc}>Get a no-obligation offer in 24 hours. No inspections. No fees. Close on your timeline.</p>
            <button className={styles.earlyCtaBtn} onClick={() => openSurvey()}>Get My Cash Offer &rarr;</button>
            {TRUST_STATS && <p className={styles.earlyCtaTrust}>{TRUST_STATS}</p>}
          </div>

          {/* Author Box */}
          {(FOUNDER_PHOTO_URL || OWNER_NAME) && (
            <div className={styles.authorBox}>
              {FOUNDER_PHOTO_URL && (
                <img src={FOUNDER_PHOTO_URL} alt={OWNER_NAME} className={styles.authorPhoto} />
              )}
              <div className={styles.authorInfo}>
                <h3>{OWNER_NAME}</h3>
                {OWNER_BIO && <p>{OWNER_BIO}</p>}
              </div>
            </div>
          )}

          {/* Founder Video */}
          {VIDALYTICS_EMBED_ID && (
            <div style={{ margin: '32px 0' }}>
              <p className={styles.videoLabel}>&#9654; Watch: {OWNER_NAME} Explains Your Options</p>
              <VidalyticsVideo embedId={VIDALYTICS_EMBED_ID} accountId={VIDALYTICS_ACCOUNT_ID} />
            </div>
          )}

          {children}

          {/* News Video 1 */}
          {NEWS_VIDEO_1_URL && (
            <div style={{ margin: '40px 0' }}>
              <p className={styles.newsLabel}>&#128250; As Seen On Local News</p>
              <div className={styles.videoWrap}>
                <iframe src={NEWS_VIDEO_1_URL} allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerPolicy="strict-origin-when-cross-origin" title={`${COMPANY_NAME} News Feature`} />
              </div>
            </div>
          )}

          {/* CTA Box */}
          <div className={styles.ctaBox}>
            <h2>Find Out What Your Home Is Worth. No Obligation.</h2>
            <p>Tell us about your property. We&apos;ll give you a real cash offer within 24 hours so you can compare your options and make the best decision for your situation.</p>
            <button className={styles.ctaButton} onClick={() => openSurvey()}>Start Free Assessment &#8594;</button>
            {TRUST_STATS && <div className={styles.ctaTrust}>{TRUST_STATS}</div>}
          </div>

          {/* News Video 2 */}
          {NEWS_VIDEO_2_URL && (
            <div style={{ margin: '40px 0' }}>
              <p className={styles.newsLabel}>&#128250; {COMPANY_NAME} In The News</p>
              <div className={styles.videoWrap}>
                <iframe src={NEWS_VIDEO_2_URL} allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerPolicy="strict-origin-when-cross-origin" title={`${COMPANY_NAME} News`} />
              </div>
            </div>
          )}

          <div className={styles.inlineCtaWrap}>
            <button className={styles.inlineCtaBtn} onClick={() => openSurvey()}>See What We Can Offer For Your Home &#8594;</button>
          </div>

          <p className={styles.disclaimer}><em>{COMPANY_NAME} is a licensed and insured real estate investment company. This article represents the opinion and experience of {OWNER_NAME} and does not constitute legal or financial advice. Individual results vary. Consult qualified professionals before making decisions.</em></p>
        </div>
      </article>
      <SurveyModal />
    </>
  );
}

export default function ArticleLayout({ configKey, ...props }) {
  const config = pageConfigs[configKey] || pageConfigs.home;
  return (
    <SurveyProvider config={config}>
      <ArticleContent {...props} />
    </SurveyProvider>
  );
}
