"use client";

import { useState, useEffect } from "react";
import { getWorkExperience, getEducation } from "@/lib/api";

export default function Resume() {
  const [activeTab, setActiveTab] = useState("professional");
  const [work, setWork] = useState<any[]>([]);
  const [edu, setEdu] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([getWorkExperience(), getEducation()]).then(([workRes, eduRes]) => {
      if (workRes.status === "fulfilled") {
        console.log("Work Experience API:", workRes.value);
        const data = Array.isArray(workRes.value) ? workRes.value : [];
        setWork(data);
      }
      if (eduRes.status === "fulfilled") {
        console.log("Education API:", eduRes.value);
        const data = Array.isArray(eduRes.value) ? eduRes.value : [];
        setEdu(data);
      }
      setLoading(false);
    });
  }, []);

  // Helper: extract work item fields regardless of key name
  const getWorkTitle = (item: any) =>
    item.company_name || item.company || item.title || item.organization || item.employer || "—";

  const getWorkRole = (item: any) =>
    item.role || item.designation || item.position || item.job_title || "";

  const getWorkPeriod = (item: any) =>
    item.period || item.duration || item.date_range || item.year ||
    ((item.start_date || item.from) ? `${item.start_date || item.from} – ${item.end_date || item.to || "Present"}` : "");

  const getWorkDesc = (item: any) =>
    item.description || item.content || item.details || item.summary || "";

  // Helper: extract education item fields
  const getEduDegree = (item: any) =>
    item.degree || item.course || item.qualification || item.title || item.program || "—";

  const getEduInstitution = (item: any) =>
    item.institution || item.school || item.university || item.college || item.organization || "—";

  const getEduPeriod = (item: any) =>
    item.period || item.duration || item.year || item.date_range ||
    ((item.start_date || item.from) ? `${item.start_date || item.from} – ${item.end_date || item.to || ""}` : "");

  const getEduDesc = (item: any) =>
    item.description || item.content || item.details || "";

  const half = Math.ceil(work.length / 2);
  const eduHalf = Math.ceil(edu.length / 2);

  //console.log(getWorkPeriod);

  const WorkCard = ({ item, i }: { item: any; i: number }) => (
    <div key={item.id ?? i} className="resume-single-list">
      <div className="inner">
        <div className="heading">
          <div className="title">
            <h4>{getWorkTitle(item)}</h4>
            {getWorkRole(item) && (
              <span style={{ color: "var(--color-primary, #f9004d)", fontSize: "13px", display: "block", marginBottom: "4px" }}>
                {getWorkRole(item)}
              </span>
            )}
            <span>{getWorkPeriod(item)}</span>
             <span>{item.experience}</span>
          </div>
        </div>
        {getWorkDesc(item) && <p className="description">{getWorkDesc(item)}</p>}
      </div>
    </div>
  );

  const EduCard = ({ item, i }: { item: any; i: number }) => (
    <div key={item.id ?? i} className="resume-single-list">
      <div className="inner">
        <div className="heading">
          <div className="title">
            <h4>{getEduDegree(item)}</h4>
             {getEduDesc(item) && <p className="description">{item.experience}</p>}            
          </div>
        </div>
        {getEduDesc(item) && <p className="description">{getEduDesc(item)}</p>}
       
      </div>
    </div>
  );

  return (
    <div className="rn-resume-area rn-section-gap section-separator" id="resume">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <span className="subtitle">10+ Years of Experience</span>
              <h2 className="title">My Resume</h2>
            </div>
          </div>
        </div>

        <div className="row mt--45">
          <div className="col-lg-12">
            <ul className="rn-nav-list nav nav-tabs" role="tablist">
              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === "professional" ? "active" : ""}`}
                  onClick={(e) => { e.preventDefault(); setActiveTab("professional"); }}
                  href="javascript:void(0)" role="tab"
                >
                  Work Experience
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === "education" ? "active" : ""}`}
                  onClick={(e) => { e.preventDefault(); setActiveTab("education"); }}
                  href="javascript:void(0)" role="tab"
                >
                  Education
                </a>
              </li>
            </ul>

            <div className="rn-nav-content tab-content">

              {/* ── Work Experience Tab ── */}
              {activeTab === "professional" && (
                <div className="tab-pane fade show active">
                  <div className="personal-experience-inner mt--40">
                    {loading ? (
                      <p style={{ textAlign: "center", opacity: 0.4 }}>Loading...</p>
                    ) : work.length === 0 ? (
                      <p style={{ textAlign: "center", opacity: 0.4 }}>
                        No work experience data found from API.{" "}
                        <span style={{ fontSize: "12px" }}>
                          Check console for the raw response.
                        </span>
                      </p>
                    ) : (
                      <div className="row">
                        <div className="col-lg-6 col-md-12 col-12">
                          <div className="content">
                            <div className="experience-list">
                              {work.slice(0, half).map((item, i) => (
                                <WorkCard key={item.id ?? i} item={item} i={i} />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-12 mt_md--60 mt_sm--60">
                          <div className="content">
                            <div className="experience-list">
                              {work.slice(half).map((item, i) => (
                                <WorkCard key={item.id ?? i} item={item} i={i} />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── Education Tab ── */}
              {activeTab === "education" && (
                <div className="tab-pane fade show active">
                  <div className="personal-experience-inner mt--40">
                    {loading ? (
                      <p style={{ textAlign: "center", opacity: 0.4 }}>Loading...</p>
                    ) : edu.length === 0 ? (
                      <p style={{ textAlign: "center", opacity: 0.4 }}>
                        No education data found from API.{" "}
                        <span style={{ fontSize: "12px" }}>
                          Check console for the raw response.
                        </span>
                      </p>
                    ) : (
                      <div className="row">
                        <div className="col-lg-6 col-md-12 col-12">
                          <div className="content">
                            <div className="experience-list">
                              {edu.slice(0, eduHalf).map((item, i) => (
                                <EduCard key={item.id ?? i} item={item} i={i} />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-12 mt_md--60 mt_sm--60">
                          <div className="content">
                            <div className="experience-list">
                              {edu.slice(eduHalf).map((item, i) => (
                                <EduCard key={item.id ?? i} item={item} i={i} />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
