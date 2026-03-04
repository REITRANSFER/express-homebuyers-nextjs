'use client';
/* eslint-disable @next/next/no-img-element */

import { SurveyProvider, useSurvey } from '@/context/SurveyContext';
import { pageConfigs } from '@/lib/surveyConfig';
import SurveyModal from '@/components/SurveyModal/SurveyModal';
import StickyBar from '@/components/StickyBar/StickyBar';
import VidalyticsVideo from '@/components/VidalyticsVideo/VidalyticsVideo';
import styles from './ArticleLayout.module.css';

function ArticleContent({ categoryBadge, title, subtitle, byline, children }) {
  const { openSurvey } = useSurvey();

  return (
    <>
      <StickyBar />
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <img src="/images/express-logo.jpg" alt="Express Homebuyers" className={styles.logo} />
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
            <p className={styles.earlyCtaTrust}>4,000+ homes purchased &#8226; A+ BBB rated &#8226; Closes in as few as 7 days</p>
          </div>

          {/* Author Box */}
          <div className={styles.authorBox}>
            <img src="/images/brad-chandler.jpg" alt="Brad Chandler" className={styles.authorPhoto} />
            <div className={styles.authorInfo}>
              <h3>Brad Chandler</h3>
              <p>Owner &amp; CEO of Express Homebuyers. Buying homes in the DMV area since 2003. Father, husband, and advocate for fair home buying practices.</p>
            </div>
          </div>

          {/* Brad's Video */}
          <div style={{ margin: '32px 0' }}>
            <p className={styles.videoLabel}>&#9654; Watch: Brad Explains Your Options</p>
            <VidalyticsVideo />
          </div>

          {children}

          {/* News Spot 1 */}
          <div style={{ margin: '40px 0' }}>
            <p className={styles.newsLabel}>&#128250; As Seen On Local News</p>
            <div className={styles.videoWrap}>
              <iframe src="https://player.vimeo.com/video/1166200191?h=258daef3e8&badge=0&autopause=0&player_id=0&app_id=58479" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerPolicy="strict-origin-when-cross-origin" title="Express Home 2025 Interview" />
            </div>
          </div>

          {/* CTA Box */}
          <div className={styles.ctaBox}>
            <h2>Find Out What Your Home Is Worth. No Obligation.</h2>
            <p>Tell us about your property. We&apos;ll give you a real cash offer within 24 hours so you can compare your options and make the best decision for your situation.</p>
            <button className={styles.ctaButton} onClick={() => openSurvey()}>Start Free Assessment &#8594;</button>
            <div className={styles.ctaTrust}>&#10003; No obligation &nbsp;&#8226;&nbsp; &#10003; Response in 24 hours &nbsp;&#8226;&nbsp; &#10003; 4,000+ homes purchased since 2003</div>
          </div>

          {/* News Spot 2 */}
          <div style={{ margin: '40px 0' }}>
            <p className={styles.newsLabel}>&#128250; Express Homebuyers In The News</p>
            <div className={styles.videoWrap}>
              <iframe src="https://player.vimeo.com/video/1166200167?h=5b2e21c26a&badge=0&autopause=0&player_id=0&app_id=58479" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerPolicy="strict-origin-when-cross-origin" title="Express Homebuyers Interview" />
            </div>
          </div>

          <div className={styles.inlineCtaWrap}>
            <button className={styles.inlineCtaBtn} onClick={() => openSurvey()}>See What We Can Offer For Your Home &#8594;</button>
          </div>

          <p className={styles.disclaimer}><em>Express Homebuyers has been purchasing homes in Maryland, DC, and Virginia since 2003. This article represents the opinion and experience of Brad Chandler and does not constitute legal or financial advice. Individual results vary. Consult qualified professionals before making decisions.</em></p>
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
