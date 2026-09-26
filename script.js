// ================= AUTOMATIC IMAGE RESOLVER (GitHub Pages & Local) =================
(function () {
    function resolveImg(img) {
        if (!img || img.dataset.resolvedFallback) return;
        var currentSrc = img.getAttribute("src") || "";
        img.dataset.resolvedFallback = "true";

        if (currentSrc.startsWith("images/")) {
            img.src = currentSrc.replace(/^images\//, "");
        } else if (img.src && img.src.includes("/images/")) {
            img.src = img.src.replace("/images/", "/");
        } else if (!currentSrc.includes("/")) {
            img.src = "images/" + currentSrc;
        }
    }

    // Capture errors on images and redirect to correct location
    window.addEventListener("error", function (e) {
        if (e.target && e.target.tagName === "IMG") {
            resolveImg(e.target);
        }
    }, true);

    // Scan any images that failed before script executed
    function scanAndFixImages() {
        var imgs = document.getElementsByTagName("img");
        for (var i = 0; i < imgs.length; i++) {
            var img = imgs[i];
            if (img.complete && img.naturalWidth === 0) {
                resolveImg(img);
            }
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", scanAndFixImages);
    } else {
        scanAndFixImages();
    }
    window.addEventListener("load", scanAndFixImages);
})();

// ================= INITIALIZATION & STATE =================
let language = localStorage.getItem("language") || "en";

// Translation Dictionary
const translations = {
    // Header & Navigation
    "Online Academy": "Online Academy",
    "Home": "الرئيسية",
    "Courses": "الكورسات",
    "About": "عن الموقع",
    "Contact": "تواصل معنا",
    "Login": "تسجيل الدخول",
    "Register": "إنشاء حساب",
    "Logout": "تسجيل الخروج",
    "Profile": "الملف الشخصي",
    "My Profile": "ملفي الشخصي",

    // Hero Section
    "WELCOME TO ONLINE ACADEMY": "مرحبًا بك في الأكاديمية الإلكترونية",
    "Build Your Future.": "ابني مستقبلك.",
    "Practical courses, clear knowledge, and real skills designed to help you learn with confidence and move forward.":
        "كورسات عملية، معرفة واضحة، ومهارات حقيقية تساعدك على التعلم بثقة والتقدم للأمام.",
    "Explore Courses →": "استكشف الكورسات →",
    "Start Learning": "ابدأ التعلم",

    // Features Section
    "Why Learn With Us?": "لماذا تتعلم معنا؟",
    "Everything you need to start learning and improve your skills.":
        "كل ما تحتاجه لبدء التعلم وتطوير مهاراتك.",
    "Learn Step by Step": "تعلم خطوة بخطوة",
    "Practical Skills": "مهارات عملية",
    "Build Your Future": "ابني مستقبلك",
    "Learn programming concepts from the basics to advanced topics.":
        "تعلم مفاهيم البرمجة من الأساسيات حتى المواضيع المتقدمة.",
    "Practice what you learn through examples and real projects.":
        "طبق ما تتعلمه من خلال الأمثلة والمشاريع الحقيقية.",
    "Develop the skills you need for your programming journey.":
        "طور المهارات التي تحتاجها في رحلتك البرمجية.",

    // About Section / Page
    "About Online Academy": "عن Online Academy",
    "Online Academy is an online learning platform designed to help students learn programming and technology step by step.":
        "Online Academy هي منصة تعليمية تساعد الطلاب على تعلم البرمجة والتكنولوجيا خطوة بخطوة.",
    "Learn": "تعلم",
    "Practice": "تدرب",
    "Improve": "طور",
    "Learn programming through simple and organized courses.":
        "تعلم البرمجة من خلال كورسات بسيطة ومنظمة.",
    "Practice what you learn through examples and exercises.":
        "طبق ما تتعلمه من خلال الأمثلة والتمارين.",
    "Build your skills and work toward real projects.":
        "طور مهاراتك واعمل على مشاريع حقيقية.",

    // Courses List Page
    "Our Courses": "كورساتنا المميزة",
    "View Course": "عرض الكورس",
    "Search for a course...": "ابحث عن كورس...",
    "🔍 No courses found matching your search.": "🔍 لم يتم العثور على كورسات تطابق بحثك.",
    "Python": "بايثون",
    "Learn Python from zero to advanced.": "تعلم بايثون من الصفر حتى الاحتراف.",
    "Java": "جافا",
    "Learn Java programming step by step.": "تعلم برمجة جافا خطوة بخطوة.",
    "Web Development": "تطوير الويب",
    "Learn HTML, CSS and JavaScript.": "تعلم HTML و CSS و JavaScript.",
    "C++": "سي بلس بلس",
    "Learn C++ programming and problem solving.": "تعلم لغة C++ وحل المشكلات البرمجية.",
    "SQL": "قواعد البيانات SQL",
    "Learn databases and SQL from the basics.": "تعلم قواعد البيانات و SQL من الأساسيات.",
    "Backend Development": "تطوير Backend",
    "Learn how to build powerful backend applications.": "تعلم كيفية بناء تطبيقات Backend قوية وموثوقة.",

    // Course Detail Pages
    "Python Course": "كورس بايثون",
    "Learn Python from the basics and build a strong programming foundation.": "تعلم بايثون من الأساسيات وابنِ أساساً برمجياً قوياً.",
    "Java Course": "كورس جافا",
    "Learn Java programming, Object-Oriented Programming (OOP) and real-world logic.": "تعلم جافا والبرمجة كائنية التوجه (OOP) والمفاهيم المتقدمة.",
    "Web Development Course": "كورس تطوير الويب",
    "Learn HTML, CSS and JavaScript step by step.": "تعلم HTML و CSS و JavaScript خطوة بخطوة.",
    "C++ Course": "كورس سي بلس بلس",
    "Master C++ fundamentals, memory management and algorithmic thinking.": "أتقن أساسيات C++ وإدارة الذاكرة والتفكير الخوارزمي.",
    "SQL Course": "كورس قواعد البيانات SQL",
    "Learn relational databases, queries, joins and database design.": "تعلم قواعد البيانات العلائقية والاستعلامات وتصميم الجداول.",
    "Backend Development Course": "كورس تطوير Backend",
    "Learn how websites work behind the scenes and build backend applications.": "تعلم كيف تعمل المواقع في الخلفية وبناء أنظمة الـ Backend.",

    // Lesson Common Buttons & Labels
    "Start Lesson": "ابدأ الدرس",
    "Next Lesson": "الدرس التالي",
    "Previous Lesson": "الدرس السابق",
    "Next": "التالي",
    "Previous": "السابق",
    "Back to Course": "العودة للكورس",
    "Mark as Completed ✅": "إكمال الدرس ✅",
    "Completed ✅": "مكتمل ✅",

    // Auth & Forms
    "Create Account": "إنشاء حساب",
    "Don't have an account?": "ليس لديك حساب؟",
    // Contact Us & Channels
    "Contact Us": "تواصل معنا",
    "Have a question? Send us a message.": "هل لديك استفسار؟ أرسل لنا رسالة.",
    "Choose your preferred way to contact us or send a direct message below.": "اختر وسيلة التواصل التي تناسبك أو أرسل رسالة مباشرة بالأسفل.",
    "⚡ Quick Channels": "⚡ تواصل سريع ومباشر",
    "✍️ Write Message": "✍️ كتابة رسالة",
    "WhatsApp": "واتساب",
    "Chat directly with our support team": "محادثة مباشرة وفورية مع فريق الدعم",
    "Open Chat 💬": "بدء المحادثة 💬",
    "Facebook": "فيسبوك",
    "Visit our official Facebook page": "زيارة صفحتنا الرسمية ومراسلتنا",
    "Visit Page 📘": "زيارة الصفحة 📘",
    "Instagram": "إنستغرام",
    "Follow us & send a direct message": "تابع جديدنا وأرسل رسالة خاصة (DM)",
    "Follow & DM 📸": "متابعة ومراسلة 📸",
    "Prefer to send an email or site message?": "هل تفضل كتابة رسالة أو إرسال بريد إلكتروني؟",
    "✍️ Write a Message": "✍️ اكتب رسالتك هنا",
    "← Back to Channels": "← العودة لخيارات التواصل",
    "Send Message": "إرسال الرسالة",
    "Send via WhatsApp 💬": "إرسال عبر واتساب 💬",

    // Profile & Progress
    "Student Name": "اسم الطالب",
    "My Progress": "مستوى تقدمي",
    "Overall Progress": "التقدم الإجمالي",
    "Completed Lessons": "الدروس المكتملة",
    "Completed Courses": "الكورسات المكتملة",
    "Continue Learning": "متابعة التعلم",

    // 404
    "Page Not Found": "الصفحة غير موجودة",
    "Sorry, the page you are looking for does not exist.": "عذراً، الصفحة التي تبحث عنها غير موجودة.",
    "Back to Home": "العودة للرئيسية",

    // Footer
    "Quick Links": "روابط سريعة",
    "Learn programming step by step.": "تعلم البرمجة خطوة بخطوة.",
    "Learn programming and technology step by step with practical courses and real-world skills.":
        "تعلم البرمجة والتكنولوجيا خطوة بخطوة من خلال كورسات عملية ومهارات حقيقية.",
    "© 2026 Online Academy. All Rights Reserved.": "© 2026 Online Academy. جميع الحقوق محفوظة."
};

// ================= TRANSLATION ENGINE =================
function translatePage() {
    let elements = document.querySelectorAll(
        "h1, h2, h3, h4, p, a, button, span, label, input, textarea"
    );

    for (let i = 0; i < elements.length; i++) {
        let el = elements[i];

        // Skip language toggle button itself
        if (el.id === "languageButton" || el.closest("#languageButton")) {
            continue;
        }

        // Handle Inputs & Textareas Placeholders
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
            let ph = el.getAttribute("placeholder");
            if (ph) {
                if (language === "ar") {
                    if (!el.getAttribute("data-orig-placeholder")) {
                        el.setAttribute("data-orig-placeholder", ph);
                    }
                    if (translations[ph]) {
                        el.setAttribute("placeholder", translations[ph]);
                    }
                } else {
                    let origPh = el.getAttribute("data-orig-placeholder");
                    if (origPh) {
                        el.setAttribute("placeholder", origPh);
                    }
                }
            }
            continue;
        }

        // Store original English text in dataset on first read
        if (!el.getAttribute("data-orig-text") && el.children.length === 0) {
            el.setAttribute("data-orig-text", el.textContent.trim());
        }

        let origText = el.getAttribute("data-orig-text");

        if (language === "ar") {
            if (origText && translations[origText]) {
                el.textContent = translations[origText];
            } else {
                let current = el.textContent.trim();
                if (translations[current]) {
                    el.textContent = translations[current];
                }
            }
        } else {
            if (origText) {
                el.textContent = origText;
            }
        }
    }
}

function changeDirection() {
    if (language === "ar") {
        document.documentElement.lang = "ar";
        document.documentElement.dir = "rtl";
        document.body.classList.add("arabic");
    } else {
        document.documentElement.lang = "en";
        document.documentElement.dir = "ltr";
        document.body.classList.remove("arabic");
    }
}

function createLanguageButton() {
    let header = document.querySelector("header");
    if (!header) return;

    let oldButton = document.getElementById("languageButton");
    if (oldButton) oldButton.remove();

    let button = document.createElement("button");
    button.id = "languageButton";
    button.type = "button";
    button.setAttribute("aria-label", "Toggle Language");

    if (language === "en") {
        button.innerHTML = "🌐 العربي";
    } else {
        button.innerHTML = "🌐 English";
    }

    button.onclick = function () {
        language = (language === "en") ? "ar" : "en";
        localStorage.setItem("language", language);

        changeDirection();
        translatePage();
        createLanguageButton();
        updateAuthHeader();
    };

    // Append to header actions container if available, or directly to header
    let actionsContainer = header.querySelector(".header-actions");
    if (actionsContainer) {
        actionsContainer.appendChild(button);
    } else {
        header.appendChild(button);
    }
}

// ================= COURSE SEARCH =================
function searchCourses() {
    let input = document.getElementById("searchInput");
    if (!input) return;

    let filter = input.value.trim().toLowerCase();
    let courses = document.getElementsByClassName("course");
    let noResults = document.getElementById("noResults");
    let visibleCount = 0;

    for (let i = 0; i < courses.length; i++) {
        let title = courses[i].querySelector("h3");
        let desc = courses[i].querySelector("p");

        let text = (title ? title.textContent : "") + " " + (desc ? desc.textContent : "");
        text = text.toLowerCase();

        if (text.includes(filter)) {
            courses[i].style.display = "";
            visibleCount++;
        } else {
            courses[i].style.display = "none";
        }
    }

    if (noResults) {
        noResults.style.display = (visibleCount === 0) ? "block" : "none";
    }
}

// ================= PROGRESS TRACKING =================
const ALL_COURSES = {
    python: { name: "Python", lessons: 5 },
    java: { name: "Java", lessons: 5 },
    web: { name: "Web Development", lessons: 5 },
    cpp: { name: "C++", lessons: 5 },
    sql: { name: "SQL", lessons: 5 },
    backend: { name: "Backend Development", lessons: 5 }
};

function getCompletedLessons() {
    try {
        let saved = localStorage.getItem("completedLessons");
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        return [];
    }
}

function saveCompletedLessons(list) {
    localStorage.setItem("completedLessons", JSON.stringify(list));
}

function getCurrentLessonId() {
    let page = window.location.pathname.split("/").pop().toLowerCase();
    if (!page) return "";
    return page.replace(".html", "");
}

function toggleLessonComplete() {
    let currentId = getCurrentLessonId();
    if (!currentId) return;

    let completed = getCompletedLessons();
    let index = completed.indexOf(currentId);

    if (index > -1) {
        completed.splice(index, 1);
    } else {
        completed.push(currentId);
    }

    saveCompletedLessons(completed);
    updateLessonButtonState();
}

function updateLessonButtonState() {
    let btn = document.getElementById("completeLessonBtn");
    if (!btn) return;

    let currentId = getCurrentLessonId();
    let completed = getCompletedLessons();
    let isDone = completed.includes(currentId);

    if (isDone) {
        btn.classList.add("completed");
        btn.textContent = (language === "ar") ? "مكتمل ✅" : "Completed ✅";
    } else {
        btn.classList.remove("completed");
        btn.textContent = (language === "ar") ? "إكمال الدرس ✅" : "Mark as Completed ✅";
    }
}

function updateCoursePageProgress() {
    // Check if we are on a course overview page (e.g., python.html)
    let page = window.location.pathname.split("/").pop().toLowerCase().replace(".html", "");
    if (!ALL_COURSES[page]) return;

    let completed = getCompletedLessons();
    let courseInfo = ALL_COURSES[page];
    let courseCompletedCount = 0;

    for (let i = 1; i <= courseInfo.lessons; i++) {
        let lessonId = `${page}-lesson${i}`;
        let lessonLink = document.querySelector(`a[href*="${lessonId}.html"]`);
        let lessonCard = lessonLink ? lessonLink.closest(".lesson") : null;

        if (completed.includes(lessonId)) {
            courseCompletedCount++;
            if (lessonCard && !lessonCard.querySelector(".lesson-badge")) {
                let badge = document.createElement("span");
                badge.className = "lesson-badge completed";
                badge.textContent = (language === "ar") ? "مكتمل ✓" : "Completed ✓";
                lessonCard.insertBefore(badge, lessonCard.firstChild);
            }
        }
    }

    // Insert or update course progress bar
    let coursePageSection = document.querySelector(".course-page");
    if (coursePageSection) {
        let oldBox = document.getElementById("courseProgressBox");
        if (oldBox) oldBox.remove();

        let percent = Math.round((courseCompletedCount / courseInfo.lessons) * 100);
        let progressBox = document.createElement("div");
        progressBox.id = "courseProgressBox";
        progressBox.className = "course-progress-box";
        progressBox.innerHTML = `
            <div style="display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 8px;">
                <span>${language === "ar" ? "نسبة إكمال الكورس" : "Course Progress"}</span>
                <span>${courseCompletedCount} / ${courseInfo.lessons} (${percent}%)</span>
            </div>
            <div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: ${percent}%;"></div>
            </div>
        `;

        let heading = coursePageSection.querySelector("h2");
        if (heading && heading.nextElementSibling) {
            heading.parentNode.insertBefore(progressBox, heading.nextElementSibling.nextElementSibling);
        }
    }
}

// ================= AUTH & USER SIMULATION =================
function getCurrentUser() {
    try {
        let user = localStorage.getItem("currentUser");
        return user ? JSON.parse(user) : null;
    } catch (e) {
        return null;
    }
}

function setCurrentUser(user) {
    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
        localStorage.removeItem("currentUser");
    }
    updateAuthHeader();
}

function updateAuthHeader() {
    let authNavBtn = document.querySelector(".auth-nav-btn, .login-button");
    if (!authNavBtn) return;

    let user = getCurrentUser();
    if (user) {
        authNavBtn.href = "profile.html";
        authNavBtn.textContent = user.name ? user.name.split(" ")[0] : (language === "ar" ? "الملف الشخصي" : "Profile");
        authNavBtn.title = "View Profile";
    } else {
        authNavBtn.href = "login.html";
        authNavBtn.textContent = (language === "ar") ? "تسجيل الدخول" : "Login";
    }
}

function setupAuthForms() {
    // Login Form
    let loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.onsubmit = function (e) {
            e.preventDefault();
            let email = document.getElementById("loginEmail").value.trim();
            let password = document.getElementById("loginPassword").value;
            let msg = document.getElementById("loginMessage");

            if (!email || !password) {
                if (msg) {
                    msg.className = "form-alert error";
                    msg.style.display = "block";
                    msg.textContent = (language === "ar") ? "يرجى ملء جميع الحقول" : "Please fill in all fields.";
                }
                return;
            }

            // Simulate login
            let displayName = email.split("@")[0];
            displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
            let user = { name: displayName, email: email };
            setCurrentUser(user);

            if (msg) {
                msg.className = "form-alert success";
                msg.style.display = "block";
                msg.textContent = (language === "ar") ? "تم تسجيل الدخول بنجاح! جاري التحويل..." : "Logged in successfully! Redirecting...";
            }

            setTimeout(function () {
                window.location.href = "profile.html";
            }, 800);
        };
    }

    // Register Form
    let regForm = document.getElementById("registerForm");
    if (regForm) {
        regForm.onsubmit = function (e) {
            e.preventDefault();
            let name = document.getElementById("regName").value.trim();
            let email = document.getElementById("regEmail").value.trim();
            let p1 = document.getElementById("regPassword").value;
            let p2 = document.getElementById("regConfirmPassword").value;
            let msg = document.getElementById("registerMessage");

            if (!name || !email || !p1 || !p2) {
                if (msg) {
                    msg.className = "form-alert error";
                    msg.style.display = "block";
                    msg.textContent = (language === "ar") ? "يرجى ملء جميع الحقول" : "Please fill all fields.";
                }
                return;
            }

            if (p1 !== p2) {
                if (msg) {
                    msg.className = "form-alert error";
                    msg.style.display = "block";
                    msg.textContent = (language === "ar") ? "كلمتا المرور غير متطابقتين!" : "Passwords do not match!";
                }
                return;
            }

            let user = { name: name, email: email };
            setCurrentUser(user);

            if (msg) {
                msg.className = "form-alert success";
                msg.style.display = "block";
                msg.textContent = (language === "ar") ? "تم إنشاء الحساب بنجاح! جاري التحويل..." : "Account created successfully! Redirecting...";
            }

            setTimeout(function () {
                window.location.href = "profile.html";
            }, 800);
        };
    }

    // Contact Form
    let contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.onsubmit = function (e) {
            e.preventDefault();
            let status = document.getElementById("contactStatus");
            if (status) {
                status.className = "form-alert success";
                status.style.display = "block";
                status.textContent = (language === "ar")
                    ? "شكراً لتواصلك معنا! تم استلام رسالتك وسنرد قريباً."
                    : "Thank you for contacting us! Your message has been received.";
            }
            contactForm.reset();
        };
    }
}

// ================= CONTACT TABS & WHATSAPP SEND =================
function switchContactTab(tab) {
    let channelsView = document.getElementById("contactChannelsView");
    let formView = document.getElementById("contactFormView");
    let tabChannelsBtn = document.getElementById("tabChannelsBtn");
    let tabFormBtn = document.getElementById("tabFormBtn");

    if (!channelsView || !formView) return;

    if (tab === "channels") {
        channelsView.style.display = "block";
        formView.style.display = "none";
        if (tabChannelsBtn) tabChannelsBtn.classList.add("active");
        if (tabFormBtn) tabFormBtn.classList.remove("active");
    } else {
        channelsView.style.display = "none";
        formView.style.display = "block";
        if (tabChannelsBtn) tabChannelsBtn.classList.remove("active");
        if (tabFormBtn) tabFormBtn.classList.add("active");
    }
}

function sendFormViaWhatsApp() {
    let nameEl = document.getElementById("contactName");
    let emailEl = document.getElementById("contactEmail");
    let msgEl = document.getElementById("contactMessage");

    let name = nameEl ? nameEl.value.trim() : "";
    let email = emailEl ? emailEl.value.trim() : "";
    let msg = msgEl ? msgEl.value.trim() : "";

    let status = document.getElementById("contactStatus");

    if (!msg) {
        if (status) {
            status.className = "form-alert error";
            status.style.display = "block";
            status.textContent = (language === "ar") ? "يرجى كتابة رسالتك أولاً!" : "Please write your message first!";
        }
        return;
    }

    let text = `مرحباً Online Academy 👋\n` +
               (name ? `👤 الاسم: ${name}\n` : "") +
               (email ? `📧 البريد: ${email}\n` : "") +
               `💬 الرسالة:\n${msg}`;

    let encoded = encodeURIComponent(text);
    let url = `https://api.whatsapp.com/send?phone=201000000000&text=${encoded}`;
    window.open(url, "_blank");
}

// ================= PROFILE PAGE POPULATION =================
function setupProfilePage() {
    let profilePage = document.querySelector(".profile-page");
    if (!profilePage) return;

    let user = getCurrentUser() || { name: "Ahmed Student", email: "student@onlineacademy.com" };
    let completed = getCompletedLessons();
    let totalCompleted = completed.length;
    let totalPossible = 30; // 6 courses * 5 lessons
    let overallPercent = Math.round((totalCompleted / totalPossible) * 100);

    // Count completed courses (all 5 lessons done)
    let completedCoursesCount = 0;
    for (let key in ALL_COURSES) {
        let count = 0;
        for (let i = 1; i <= 5; i++) {
            if (completed.includes(`${key}-lesson${i}`)) count++;
        }
        if (count === 5) completedCoursesCount++;
    }

    let initial = user.name ? user.name.charAt(0).toUpperCase() : "S";

    profilePage.innerHTML = `
        <h2 style="margin-bottom: 25px;">${language === "ar" ? "ملفي الشخصي" : "My Profile"}</h2>

        <div class="profile-header-card">
            <div class="profile-avatar">${initial}</div>
            <div class="profile-info">
                <h3>${user.name}</h3>
                <p>📧 ${user.email}</p>
            </div>
            <button class="logout-btn" onclick="logoutUser()">
                ${language === "ar" ? "تسجيل الخروج" : "Logout"}
            </button>
        </div>

        <div class="profile-stats-grid">
            <div class="stat-card">
                <h4>${language === "ar" ? "الدروس المكتملة" : "Completed Lessons"}</h4>
                <div class="stat-number">${totalCompleted} / ${totalPossible}</div>
            </div>
            <div class="stat-card">
                <h4>${language === "ar" ? "الكورسات المكتملة" : "Completed Courses"}</h4>
                <div class="stat-number">${completedCoursesCount} / 6</div>
            </div>
            <div class="stat-card">
                <h4>${language === "ar" ? "التقدم الإجمالي" : "Overall Progress"}</h4>
                <div class="stat-number">${overallPercent}%</div>
            </div>
        </div>

        <div class="courses-progress-section">
            <h3 style="margin-bottom: 20px; color: #092b2e;">
                ${language === "ar" ? "تقدمك في الكورسات" : "Your Courses Progress"}
            </h3>
            <div id="courseProgressList"></div>
        </div>
    `;

    let listContainer = document.getElementById("courseProgressList");
    if (!listContainer) return;

    for (let key in ALL_COURSES) {
        let course = ALL_COURSES[key];
        let done = 0;
        for (let i = 1; i <= course.lessons; i++) {
            if (completed.includes(`${key}-lesson${i}`)) done++;
        }
        let percent = Math.round((done / course.lessons) * 100);

        let row = document.createElement("div");
        row.className = "course-progress-row";
        row.innerHTML = `
            <div class="course-progress-header">
                <span>
                    <strong>${course.name}</strong> 
                    <small style="color: #64748b;">(${done}/${course.lessons} ${language === "ar" ? "دروس" : "lessons"})</small>
                </span>
                <span style="color: ${percent === 100 ? '#10b981' : '#0b3b3e'}; font-weight: bold;">
                    ${percent}% ${percent === 100 ? '🎉' : ''}
                </span>
            </div>
            <div class="progress-track">
                <div class="progress-fill" style="width: ${percent}%;"></div>
            </div>
            <div style="margin-top: 10px; text-align: ${language === 'ar' ? 'left' : 'right'};">
                <a href="${key}.html" class="course-button" style="padding: 7px 16px; font-size: 13px;">
                    ${done === course.lessons ? (language === 'ar' ? 'مراجعة الكورس' : 'Review Course') : (language === 'ar' ? 'متابعة الكورس' : 'Continue Course')} →
                </a>
            </div>
        `;
        listContainer.appendChild(row);
    }
}

function logoutUser() {
    setCurrentUser(null);
    window.location.href = "index.html";
}

// ================= SCROLL REVEAL ENGINE =================
function initScrollReveal() {
    let selector = ".feature-card, .about-card, .course, .info-box, .lesson, .stat-card, .channel-card, .contact-alt-prompt, .hero-content";
    let elements = document.querySelectorAll(selector);

    if (!("IntersectionObserver" in window)) {
        elements.forEach(function (el) {
            el.classList.add("revealed");
        });
        return;
    }

    let observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px"
    });

    elements.forEach(function (el) {
        el.classList.add("reveal-on-scroll");
        observer.observe(el);
    });
}

// ================= FLOATING WHATSAPP & BACK TO TOP =================
function createFloatingWidgets() {
    // 1. Floating WhatsApp Button
    if (!document.querySelector(".floating-whatsapp")) {
        let wa = document.createElement("a");
        wa.className = "floating-whatsapp";
        wa.href = "https://wa.me/201000000000";
        wa.target = "_blank";
        wa.rel = "noopener noreferrer";
        wa.setAttribute("aria-label", "Chat on WhatsApp");
        wa.title = (language === "ar") ? "تواصل معنا عبر واتساب" : "Chat on WhatsApp";
        wa.innerHTML = `
            <svg viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.159.57 4.184 1.564 5.938l-1.654 6.046 6.19-1.624c1.704.935 3.661 1.468 5.748 1.468 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z"/>
            </svg>
        `;
        document.body.appendChild(wa);
    }

    // 2. Back to Top Button
    if (!document.querySelector(".back-to-top")) {
        let topBtn = document.createElement("button");
        topBtn.className = "back-to-top";
        topBtn.type = "button";
        topBtn.setAttribute("aria-label", "Back to top");
        topBtn.title = (language === "ar") ? "العودة للأعلى" : "Back to top";
        topBtn.innerHTML = "↑";
        topBtn.onclick = function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        };
        document.body.appendChild(topBtn);

        window.addEventListener("scroll", function () {
            if (window.scrollY > 300) {
                topBtn.classList.add("visible");
            } else {
                topBtn.classList.remove("visible");
            }
        });
    }
}

// ================= DOM READY =================
document.addEventListener("DOMContentLoaded", function () {
    changeDirection();
    translatePage();
    createLanguageButton();
    updateAuthHeader();
    setupAuthForms();
    updateLessonButtonState();
    updateCoursePageProgress();
    setupProfilePage();
    initScrollReveal();
    createFloatingWidgets();
});