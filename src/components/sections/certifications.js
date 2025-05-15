import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';
import { ShieldCheck } from 'lucide-react';

const StyledCertificationsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .certifications-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 25px;
    position: relative;
    margin-top: 50px;
    width: 100%;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
`;

const StyledCertification = styled.li`
  position: relative;
  cursor: default;

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .certification-inner {
        transform: translateY(-7px);
        background-color: var(--light-navy-shadow);
        box-shadow: 0 20px 30px -15px var(--navy-shadow);
      }
    }
  }

  .certification-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 2.5rem;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    .certification-content {
      flex: 1;
      margin-right: 30px;
    }

    .certification-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 35px;

      .certification-logo {
        ${({ theme }) => theme.mixins.flexCenter};
        color: var(--green);
        background-color: var(--green-tint);
        border-radius: 50%;
        width: 50px;
        height: 50px;
        padding: 10px;

        svg {
          width: 30px;
          height: 30px;
        }
      }

      .certification-links {
        display: flex;
        align-items: center;

        a {
          ${({ theme }) => theme.mixins.flexCenter};
          padding: 10px;
          border-radius: var(--border-radius);
          background-color: var(--lightest-navy);
          color: var(--green);
          font-size: var(--fz-lg);

          &:hover {
            background-color: var(--green);
            color: var(--navy);
          }

          svg {
            width: 22px;
            height: 22px;
          }
        }
      }
    }

    .certification-title {
      margin: 0 0 15px;
      color: var(--lightest-slate);
      font-size: var(--fz-heading);
      font-weight: 600;
    }

    .certification-issuer {
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-md);
      font-weight: 400;
      margin-bottom: 10px;
    }

    .certification-meta {
      display: flex;
      align-items: center;
      margin-top: 20px;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-sm);

      &:before {
        content: '⌘';
        margin-right: 10px;
      }
    }
  }
`;

const Certifications = () => {
  const revealTitle = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    sr.reveal(revealTitle.current, srConfig());
  }, [prefersReducedMotion]);

  const certificationsList = [
    {
      title: 'Azure Data Engineer Associate',
      issuer: 'Microsoft',
      date: 'June 2023',
      link: 'https://example.com/cert1',
    },
    {
      title: 'Databricks Certified Associate Developer',
      issuer: 'Databricks',
      date: 'March 2023',
      link: 'https://example.com/cert2',
    },
    {
      title: 'Power BI Data Analyst Associate',
      issuer: 'Microsoft',
      date: 'January 2023',
      link: 'https://example.com/cert3',
    },
    // Add more certifications as needed
  ];

  return (
    <StyledCertificationsSection id="certifications">
      <h2 className="numbered-heading" ref={revealTitle}>
        Professional Certifications
      </h2>

      <ul className="certifications-grid">
        {certificationsList.map((cert, i) => (
          <StyledCertification key={i}>
            <div className="certification-inner">
              <div className="certification-content">
                <div className="certification-top">
                  <div className="certification-logo">
                    <ShieldCheck name="Certificate" />
                  </div>
                  <div className="certification-links">
                    <a
                      href={cert.link}
                      aria-label="Certificate Link"
                      target="_blank"
                      rel="noreferrer">
                      <Icon name="External" />
                    </a>
                  </div>
                </div>

                <h3 className="certification-title">{cert.title}</h3>
                <div className="certification-issuer">{cert.issuer}</div>
                <div className="certification-meta">{cert.date}</div>
              </div>
            </div>
          </StyledCertification>
        ))}
      </ul>
    </StyledCertificationsSection>
  );
};

export default Certifications;
