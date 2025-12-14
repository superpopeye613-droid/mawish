// ============================================
// VARIABLES GLOBAL
// ============================================
let currentUser = null;
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "sayang123";

// ============================================
// DATA MEDIA
// ============================================
const folderData = {
    foto: [
        { name: "Foto 1", src: "fotokita1.jpeg", size: "2.1 MB" },
        { name: "Foto 2", src: "fotokita2.jpeg", size: "1.8 MB" },
        { name: "Foto 3", src: "fotokita3.jpeg", size: "2.3 MB" },
        { name: "Foto 4", src: "fotokita4.jpeg", size: "1.9 MB" },
        { name: "Foto 5", src: "fotokita5.jpeg", size: "2.0 MB" },
        { name: "Foto 6", src: "fotokita6.jpeg", size: "1.7 MB" },
        { name: "Foto 7", src: "fotokita7.jpeg", size: "1.9 MB" },
        { name: "Foto 8", src: "fotokita8.jpeg", size: "1.9 MB" },
        { name: "Foto 9", src: "fotokita9.jpeg", size: "1.5 MB" },
        { name: "Foto 10", src: "fotokita10.jpeg", size: "2.6 MB" },
        { name: "Foto 11", src: "fotokita11.jpeg", size: "2.3 MB" },
        { name: "Foto 12", src: "fotokita12.jpeg", size: "2.0 MB" },
        { name: "Foto 13", src: "fotokita13.jpeg", size: "2.5 MB" },
        { name: "Foto 14", src: "fotokita14.jpeg", size: "2.4 MB" },
        { name: "Foto 15", src: "fotokita15.jpeg", size: "2.9 MB" },
        { name: "Foto 16", src: "fotokita16.jpeg", size: "2.5 MB" },
        { name: "Foto 17", src: "fotokita17.jpeg", size: "1.5 MB" },
        { name: "Foto 18", src: "fotokita18.jpeg", size: "1.4 MB" },
        { name: "Foto 19", src: "fotokita19.jpeg", size: "1.2 MB" },
        { name: "Foto 20", src: "fotokita20.jpeg", size: "1.0 MB" },
        { name: "Foto 21", src: "fotokita21.jpeg", size: "1.6 MB" },
        { name: "Foto 22", src: "fotokita22.jpeg", size: "1.8 MB" },
        { name: "Foto 23", src: "fotokita23.jpeg", size: "1.5 MB" }
 ],
    video: [
        { name: "Video 01", src: "vidiokita1.mp4", size: "15.2 MB" },
        { name: "Video 02", src: "vidiokita2.mp4", size: "18.5 MB" },
        { name: "Video 03", src: "vidiokita3.mp4", size: "11.7 MB" },
        { name: "Video 04", src: "vidiokita4.mp4", size: "10.5 MB" },
        { name: "Video 05", src: "vidiokita5.mp4", size: "13.3 MB" },
        { name: "Video 06", src: "vidiokita6.mp4", size: "14.4 MB" },
        { name: "Video 07", src: "vidiokita7.mp4", size: "12.5 MB" },
        { name: "Video 08", src: "vidiokita8.mp4", size: "11.6 MB" },
        { name: "Video 09", src: "vidiokita9.mp4", size: "10.7 MB" },
        { name: "Video 10", src: "vidiokita10.mp4", size: "8.5 MB" }
        
    ],
    pesan: [
        { sender: "Alif", date: "2024-12-01", content: "Hai sayang, aku selalu memikirkanmu ❤️" },
        { sender: "Alif", date: "2024-12-02", content: "Semangat ya, kamu wanita terkuat yang aku kenal 💪" },
        { sender: "Alif", date: "2024-12-03", content: "Terima kasih sudah selalu ada untukku 🌸" },
        { sender: "Alif", date: "2024-12-03", content: "ndaaa....maksihh sudahh buatt hidupkuu lebihh berwarnaa saatt adaa kamuu di dalamnyaa,iii lovee youu so muchh" }
    ],
    secret: [
        { name: "Video Spesial", src: "secret1.mp4", size: "12.3 MB" },
        { name: "Video Sayang", src: "secret2.mp4", size: "11.2 MB" }
    ]
};

// ============================================
// LOGIN SYSTEM DENGAN USER LEVEL
// ============================================
document.getElementById("loginBtn").addEventListener("click", () => {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();

    if (user === "nandacantik" && pass === "alifsayangndaa") {
        // Login sebagai user biasa
        currentUser = { 
            username: user, 
            isAdmin: false,
            userId: generateUserId(user)
        };
        handleLoginSuccess();
    } else if (user === ADMIN_USERNAME && pass === ADMIN_PASSWORD) {
        // Login sebagai admin
        currentUser = { 
            username: user, 
            isAdmin: true,
            userId: "admin"
        };
        handleLoginSuccess();
    } else {
        alert("Username atau password salah 😘");
    }
});

// Generate user ID dari username
function generateUserId(username) {
    return 'user_' + username.toLowerCase().replace(/[^a-z0-9]/g, '_');
}

function handleLoginSuccess() {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("appPage").style.display = "flex";
    
    if (currentUser.isAdmin) {
        // Tampilkan menu admin
        document.getElementById("adminMenu").style.display = "block";
        alert(`Selamat datang Admin! 👑`);
    } else {
        // Sembunyikan menu admin untuk user biasa
        document.getElementById("adminMenu").style.display = "none";
        alert("Hai sayangg ❤️ Masuk yaa~");
    }
    
    // Load semua data
    loadAllData();
}

// ============================================
// LOGOUT
// ============================================
document.getElementById("logoutBtn").addEventListener("click", () => {
    if (confirm("Yakin logout sayang?")) {
        currentUser = null;
        location.reload();
    }
});

// ============================================
// PAGE SWITCH DENGAN PERMISSION CHECK
// ============================================
function showPage(id) {
    // Hide all pages
    document.querySelectorAll(".page").forEach(p => p.style.display = "none");
    
    // Check permission untuk halaman admin
    if ((id === 'adminQuestions' || id === 'adminAnswers' || id === 'adminData') && (!currentUser || !currentUser.isAdmin)) {
        alert("Hanya admin yang bisa mengakses halaman ini! 🔒");
        showPage('dashboard');
        return;
    }
    
    // Show selected page
    document.getElementById(id).style.display = "block";
    
    // Jika pindah ke slideshow, inisialisasi
    if (id === 'slideshow') {
        initializeSlideshow();
    }
    
    // Jika pindah ke questions page, load questions untuk dijawab
    if (id === 'questionsPage') {
        loadQuestionsForAnswer();
    }
    
    // Jika pindah ke my answers, load jawaban user
    if (id === 'myAnswers') {
        loadMyAnswers();
    }
    
    // Jika pindah ke admin questions, load untuk edit
    if (id === 'adminQuestions') {
        loadQuestionsForAdmin();
    }
    
    // Jika pindah ke admin answers, load jawaban semua user
    if (id === 'adminAnswers') {
        loadAdminAnswers();
    }
    
    // Jika pindah ke admin data, load stats
    if (id === 'adminData') {
        loadAdminStats();
    }
}

// ============================================
// DATA PERTANYAAN CINTA
// ============================================
let loveQuestions = JSON.parse(localStorage.getItem('loveQuestions')) || [
    {
        id: 1,
        question: "Apa makanan favorit Nanda?",
        date: "2024-12-13",
        createdBy: "admin"
    },
    {
        id: 2,
        question: "Tanggal berapa anniversary pertama kita?",
        date: "2024-12-13",
        createdBy: "admin"
    },
    {
        id: 3,
        question: "Dimana pertama kali kita bertemu?",
        date: "2024-12-13",
        createdBy: "admin"
    }
];

// ============================================
// DATA JAWABAN USER
// ============================================
let userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];

// ============================================
// FUNGSI UNTUK PERTANYAAN CINTA
// ============================================
// Load questions untuk user jawab
function loadQuestionsForAnswer() {
    const questionsList = document.getElementById('questionsAnswerList');
    const questionsCount = document.getElementById('questionsCount');
    const answeredCount = document.getElementById('answeredCount');
    const unansweredCount = document.getElementById('unansweredCount');
    
    if (loveQuestions.length === 0) {
        questionsList.innerHTML = `
            <div class="empty-state">
                <p>Belum ada pertanyaan. Admin akan menambah pertanyaan segera.</p>
            </div>
        `;
        questionsCount.textContent = '0';
        answeredCount.textContent = '0';
        unansweredCount.textContent = '0';
        return;
    }
    
    // Get user's answers
    const userAnswerData = userAnswers.filter(a => a.userId === currentUser.userId);
    
    let html = '';
    let answered = 0;
    
    loveQuestions.forEach((question, index) => {
        // Check if user has answered this question
        const userAnswer = userAnswerData.find(a => a.questionId === question.id);
        const hasAnswered = !!userAnswer;
        
        if (hasAnswered) answered++;
        
        html += `
            <div class="answer-item">
                <div class="question-header">
                    <div class="question-number-answer">${index + 1}</div>
                    <div class="question-status ${hasAnswered ? 'status-answered' : 'status-unanswered'}">
                        ${hasAnswered ? '✓ Sudah dijawab' : '✗ Belum dijawab'}
                    </div>
                </div>
                <div class="question-text-answer">${question.question}</div>
                <div class="answer-input-container">
                    <textarea 
                        class="answer-textarea" 
                        id="answer-${question.id}"
                        placeholder="Tulis jawabanmu di sini..."
                        oninput="updateCharacterCount(${question.id})"
                        maxlength="500"
                    >${userAnswer ? userAnswer.answer : ''}</textarea>
                    <div class="answer-character-count" id="charCount-${question.id}">
                        ${userAnswer ? userAnswer.answer.length : 0}/500 karakter
                    </div>
                </div>
            </div>
        `;
    });
    
    questionsList.innerHTML = html;
    questionsCount.textContent = loveQuestions.length;
    answeredCount.textContent = answered;
    unansweredCount.textContent = loveQuestions.length - answered;
    
    // Initialize character counts
    loveQuestions.forEach(question => {
        const userAnswer = userAnswerData.find(a => a.questionId === question.id);
        if (userAnswer) {
            updateCharacterCount(question.id);
        }
    });
}

// Update character count
function updateCharacterCount(questionId) {
    const textarea = document.getElementById(`answer-${questionId}`);
    const charCount = document.getElementById(`charCount-${questionId}`);
    
    if (textarea && charCount) {
        const count = textarea.value.length;
        charCount.textContent = `${count}/500 karakter`;
        
        // Change color if approaching limit
        if (count > 450) {
            charCount.style.color = '#ff4757';
        } else if (count > 400) {
            charCount.style.color = '#ffa502';
        } else {
            charCount.style.color = '#888';
        }
    }
}

// Save all answers
function saveAllAnswers() {
    if (!currentUser) return;
    
    let savedCount = 0;
    const userAnswerData = userAnswers.filter(a => a.userId !== currentUser.userId);
    
    loveQuestions.forEach(question => {
        const textarea = document.getElementById(`answer-${question.id}`);
        if (textarea) {
            const answer = textarea.value.trim();
            
            if (answer) {
                // Check if answer already exists
                const existingAnswerIndex = userAnswerData.findIndex(a => 
                    a.userId === currentUser.userId && a.questionId === question.id
                );
                
                const answerData = {
                    id: Date.now() + Math.random(), // Generate unique ID
                    userId: currentUser.userId,
                    username: currentUser.username,
                    questionId: question.id,
                    question: question.question,
                    answer: answer,
                    date: new Date().toISOString(),
                    timestamp: Date.now()
                };
                
                if (existingAnswerIndex !== -1) {
                    // Update existing answer
                    userAnswerData[existingAnswerIndex] = answerData;
                } else {
                    // Add new answer
                    userAnswerData.push(answerData);
                }
                
                savedCount++;
            }
        }
    });
    
    userAnswers = userAnswerData;
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    
    showNotification(`Berhasil menyimpan ${savedCount} jawaban! 💾`);
    
    // Refresh the page
    loadQuestionsForAnswer();
    loadMyAnswers();
    
    // If admin is logged in, refresh admin answers view
    if (currentUser.isAdmin) {
        loadAdminAnswers();
        loadAdminStats();
    }
}

// ============================================
// MY ANSWERS - User melihat jawaban sendiri
// ============================================
function loadMyAnswers() {
    const myAnswersList = document.getElementById('myAnswersList');
    const myTotalQuestions = document.getElementById('myTotalQuestions');
    const myAnsweredCount = document.getElementById('myAnsweredCount');
    const myPercentage = document.getElementById('myPercentage');
    
    if (!currentUser) return;
    
    const userAnswerData = userAnswers.filter(a => a.userId === currentUser.userId);
    
    if (userAnswerData.length === 0) {
        myAnswersList.innerHTML = `
            <div class="no-answers">
                <p>Kamu belum menjawab pertanyaan apapun.</p>
                <p>Silakan pergi ke halaman "Jawab Pertanyaan" untuk mulai menjawab.</p>
            </div>
        `;
        myTotalQuestions.textContent = loveQuestions.length;
        myAnsweredCount.textContent = '0';
        myPercentage.textContent = '0%';
        return;
    }
    
    // Sort by date descending (newest first)
    const sortedAnswers = [...userAnswerData].sort((a, b) => b.timestamp - a.timestamp);
    
    let html = '';
    sortedAnswers.forEach((answer, index) => {
        const question = loveQuestions.find(q => q.id === answer.questionId);
        const questionText = question ? question.question : 'Pertanyaan tidak ditemukan';
        
        html += `
            <div class="my-answer-item">
                <div class="my-question-header">
                    <div class="my-question-number">Jawaban #${index + 1}</div>
                    <div class="my-question-date">${formatDate(answer.date)}</div>
                </div>
                <div class="my-question-text">${questionText}</div>
                <div class="my-answer-text">${answer.answer}</div>
            </div>
        `;
    });
    
    myAnswersList.innerHTML = html;
    
    // Update stats
    myTotalQuestions.textContent = loveQuestions.length;
    myAnsweredCount.textContent = userAnswerData.length;
    
    const percentage = loveQuestions.length > 0 
        ? Math.round((userAnswerData.length / loveQuestions.length) * 100)
        : 0;
    myPercentage.textContent = `${percentage}%`;
}

// ============================================
// ADMIN ANSWERS MANAGEMENT
// ============================================
function loadAdminAnswers() {
    if (!currentUser || !currentUser.isAdmin) return;
    
    // Update filters
    updateAnswerFilters();
    
    // Load answers table
    loadAnswersTable();
    
    // Update stats
    updateAnswerStats();
}

function updateAnswerFilters() {
    const userFilter = document.getElementById('filterUser');
    const questionFilter = document.getElementById('filterQuestion');
    
    // Get unique users
    const uniqueUsers = [...new Set(userAnswers.map(a => a.username))];
    
    // Update user filter
    if (userFilter) {
        userFilter.innerHTML = '<option value="all">Semua Pengguna</option>';
        uniqueUsers.forEach(user => {
            userFilter.innerHTML += `<option value="${user}">${user}</option>`;
        });
    }
    
    // Update question filter
    if (questionFilter) {
        questionFilter.innerHTML = '<option value="all">Semua Pertanyaan</option>';
        loveQuestions.forEach(question => {
            questionFilter.innerHTML += `<option value="${question.id}">${question.question.substring(0, 50)}...</option>`;
        });
    }
}

function loadAnswersTable(filteredAnswers = null) {
    const answersTable = document.getElementById('answersTable');
    const answers = filteredAnswers || userAnswers;
    
    if (!answersTable) return;
    
    if (answers.length === 0) {
        answersTable.innerHTML = `
            <div class="empty-state">
                <p>Belum ada jawaban dari pengguna.</p>
            </div>
        `;
        return;
    }
    
    // Sort by date descending
    const sortedAnswers = [...answers].sort((a, b) => b.timestamp - a.timestamp);
    
    let html = `
        <table class="answers-table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Pengguna</th>
                    <th>Pertanyaan</th>
                    <th>Jawaban</th>
                    <th>Tanggal</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    sortedAnswers.forEach((answer, index) => {
        html += `
            <tr>
                <td>${index + 1}</td>
                <td class="user-cell">${answer.username}</td>
                <td class="question-cell" title="${answer.question}">${answer.question.substring(0, 50)}...</td>
                <td class="answer-cell" title="${answer.answer}">${answer.answer.substring(0, 50)}...</td>
                <td class="date-cell">${formatDate(answer.date)}</td>
                <td class="action-cell">
                    <button class="view-answer-btn" onclick="showAnswerDetail('${answer.id}')">👁️ Lihat</button>
                    <button class="delete-answer-btn" onclick="deleteAnswer('${answer.id}')">🗑️ Hapus</button>
                </td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
        </table>
    `;
    
    answersTable.innerHTML = html;
}

function updateAnswerStats() {
    const totalUsers = document.getElementById('totalUsers');
    const totalQuestions = document.getElementById('totalQuestions');
    const totalAnswers = document.getElementById('totalAnswers');
    const avgAnswers = document.getElementById('avgAnswers');
    
    if (!totalUsers || !totalQuestions || !totalAnswers || !avgAnswers) return;
    
    // Get unique users
    const uniqueUsers = [...new Set(userAnswers.map(a => a.username))];
    
    // Calculate average answers per user
    let avgPercentage = 0;
    if (uniqueUsers.length > 0 && loveQuestions.length > 0) {
        const totalPossibleAnswers = uniqueUsers.length * loveQuestions.length;
        const actualAnswers = userAnswers.length;
        avgPercentage = Math.round((actualAnswers / totalPossibleAnswers) * 100);
    }
    
    totalUsers.textContent = uniqueUsers.length;
    totalQuestions.textContent = loveQuestions.length;
    totalAnswers.textContent = userAnswers.length;
    avgAnswers.textContent = `${avgPercentage}%`;
}

function filterAnswers() {
    const selectedUser = document.getElementById('filterUser').value;
    const selectedQuestion = document.getElementById('filterQuestion').value;
    
    let filtered = userAnswers;
    
    if (selectedUser !== 'all') {
        filtered = filtered.filter(a => a.username === selectedUser);
    }
    
    if (selectedQuestion !== 'all') {
        filtered = filtered.filter(a => a.questionId.toString() === selectedQuestion);
    }
    
    loadAnswersTable(filtered);
    updateAnswerStats();
}

function showAnswerDetail(answerId) {
    const answer = userAnswers.find(a => a.id.toString() === answerId.toString());
    if (!answer) return;
    
    const answerDetail = document.getElementById('answerDetail');
    
    const detailHtml = `
        <div class="answer-detail-content">
            <div class="answer-detail-header">
                <div class="answer-detail-user">${answer.username}</div>
                <div class="answer-detail-date">${formatDate(answer.date)}</div>
            </div>
            <div class="answer-detail-question">${answer.question}</div>
            <div class="answer-detail-answer">${answer.answer}</div>
            <button class="close-detail-btn" onclick="closeAnswerDetail()">Tutup</button>
        </div>
    `;
    
    if (answerDetail) {
        answerDetail.innerHTML = detailHtml;
        answerDetail.style.display = 'block';
        
        // Scroll to detail
        answerDetail.scrollIntoView({ behavior: 'smooth' });
    }
}

function closeAnswerDetail() {
    const answerDetail = document.getElementById('answerDetail');
    if (answerDetail) {
        answerDetail.style.display = 'none';
    }
}

function deleteAnswer(answerId) {
    if (!confirm("Yakin ingin menghapus jawaban ini?")) return;
    
    userAnswers = userAnswers.filter(a => a.id.toString() !== answerId.toString());
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    
    showNotification("Jawaban berhasil dihapus!");
    
    // Refresh views
    loadAdminAnswers();
    loadAdminStats();
}

function exportAnswersToCsv() {
    if (userAnswers.length === 0) {
        alert("Belum ada jawaban untuk di-export.");
        return;
    }
    
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Add header
    csvContent += "No,Username,Pertanyaan,Jawaban,Tanggal\n";
    
    // Add rows
    userAnswers.forEach((answer, index) => {
        const row = [
            index + 1,
            `"${answer.username}"`,
            `"${answer.question.replace(/"/g, '""')}"`,
            `"${answer.answer.replace(/"/g, '""')}"`,
            formatDate(answer.date)
        ].join(',');
        csvContent += row + "\n";
    });
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `jawaban-pengguna-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification("Jawaban berhasil di-export ke CSV!");
}

function resetAllAnswers() {
    if (!confirm("Yakin ingin menghapus SEMUA jawaban pengguna? Tindakan ini tidak dapat dibatalkan!")) return;
    
    userAnswers = [];
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    
    showNotification("Semua jawaban pengguna telah dihapus!");
    
    // Refresh views
    loadAdminAnswers();
    loadAdminStats();
    loadMyAnswers();
}

// ============================================
// FORMAT DATE HELPER
// ============================================
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// ============================================
// ADMIN QUESTIONS MANAGEMENT
// ============================================
function loadQuestionsForAdmin() {
    const questionsListAdmin = document.getElementById('questionsListAdmin');
    if (!questionsListAdmin) return;
    
    if (loveQuestions.length === 0) {
        questionsListAdmin.innerHTML = `
            <div class="empty-state">
                <p>Belum ada pertanyaan. Klik "Tambah Pertanyaan Baru" untuk menambah.</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    loveQuestions.forEach((question, index) => {
        html += `
            <div class="question-admin-item" id="question-${question.id}">
                <div class="question-admin-header">
                    <span class="question-admin-number">Pertanyaan #${index + 1}</span>
                    <button class="delete-question-btn" onclick="deleteQuestion(${question.id})">🗑️</button>
                </div>
                <textarea class="question-admin-textarea" id="admin-question-${question.id}">${question.question}</textarea>
            </div>
        `;
    });
    
    questionsListAdmin.innerHTML = html;
}

function addNewQuestion() {
    const newId = loveQuestions.length > 0 ? Math.max(...loveQuestions.map(q => q.id)) + 1 : 1;
    const newQuestion = {
        id: newId,
        question: "Pertanyaan baru... (edit di sini)",
        date: new Date().toISOString(),
        createdBy: currentUser ? currentUser.username : "admin"
    };
    
    loveQuestions.push(newQuestion);
    localStorage.setItem('loveQuestions', JSON.stringify(loveQuestions));
    
    loadQuestionsForAdmin();
    showNotification("Pertanyaan baru ditambahkan!");
}

function deleteQuestion(questionId) {
    if (!confirm("Yakin ingin menghapus pertanyaan ini?")) return;
    
    loveQuestions = loveQuestions.filter(q => q.id !== questionId);
    localStorage.setItem('loveQuestions', JSON.stringify(loveQuestions));
    
    // Also remove answers for this question
    userAnswers = userAnswers.filter(a => a.questionId !== questionId);
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    
    loadQuestionsForAdmin();
    showNotification("Pertanyaan berhasil dihapus!");
    
    // Refresh all related views
    if (currentUser && !currentUser.isAdmin) {
        loadQuestionsForAnswer();
        loadMyAnswers();
    }
    
    if (currentUser && currentUser.isAdmin) {
        loadAdminAnswers();
        loadAdminStats();
    }
}

function saveAllQuestions() {
    if (!currentUser || !currentUser.isAdmin) return;
    
    let savedCount = 0;
    
    loveQuestions.forEach(question => {
        const textarea = document.getElementById(`admin-question-${question.id}`);
        if (textarea) {
            const newQuestionText = textarea.value.trim();
            if (newQuestionText && newQuestionText !== question.question) {
                question.question = newQuestionText;
                savedCount++;
            }
        }
    });
    
    localStorage.setItem('loveQuestions', JSON.stringify(loveQuestions));
    showNotification(`Berhasil menyimpan ${savedCount} perubahan!`);
}

// ============================================
// ADMIN DATA MANAGEMENT
// ============================================
function loadAdminStats() {
    // Update stats counters
    const photoCount = document.getElementById('photoCount');
    const videoCount = document.getElementById('videoCount');
    const messageCount = document.getElementById('messageCount');
    const questionCount = document.getElementById('questionCount');
    const answerCount = document.getElementById('answerCount');
    
    if (photoCount) photoCount.textContent = folderData.foto.length;
    if (videoCount) videoCount.textContent = folderData.video.length;
    if (messageCount) messageCount.textContent = folderData.pesan.length;
    if (questionCount) questionCount.textContent = loveQuestions.length;
    if (answerCount) answerCount.textContent = userAnswers.length;
}

// ============================================
// LOVE NOTES SYSTEM
// ============================================
const loveNotes = [
    "Aku bersyukur setiap hari karena memiliki kamu dalam hidupku ❤️",
    "Cintaku padamu tumbuh lebih dalam setiap hari 🌸",
    "Kamu adalah mimpi indah yang menjadi kenyataan 💫",
    "Bersamamu, setiap hari adalah petualangan baru 🌈",
    "Aku tidak bisa membayangkan hidup tanpa senyummu ☀️",
    "Kamu membuatku menjadi versi terbaik dari diriku sendiri ✨",
    "Cinta kita adalah cerita terindah yang pernah aku tulis 📖",
    "Di mataku, kamu selalu akan menjadi yang tercantik 💖",
    "Terima kasih sudah menjadi rumah bagi hatiku 🏡",
    "Aku mencintaimu lebih dari kata-kata bisa ungkapkan 💌"
];

let notesHistory = JSON.parse(localStorage.getItem('notesHistory')) || [];

function generateLoveNote() {
    const randomIndex = Math.floor(Math.random() * loveNotes.length);
    const note = loveNotes[randomIndex];
    
    document.getElementById('noteDisplay').innerHTML = `
        <div class="note-content">
            <p class="note-text">${note}</p>
            <p class="note-signature">- Untuk Nanda & Alif -</p>
        </div>
    `;
    
    // Add to history
    const historyItem = {
        note: note,
        timestamp: Date.now(),
        date: new Date().toISOString()
    };
    
    notesHistory.unshift(historyItem);
    if (notesHistory.length > 10) notesHistory = notesHistory.slice(0, 10);
    
    localStorage.setItem('notesHistory', JSON.stringify(notesHistory));
    updateNotesHistory();
}

function copyNote() {
    const noteText = document.querySelector('.note-text').textContent;
    navigator.clipboard.writeText(noteText)
        .then(() => showNotification("Pesan berhasil disalin! 📋"))
        .catch(err => alert("Gagal menyalin: " + err));
}

function saveNote() {
    const noteText = document.querySelector('.note-text').textContent;
    const blob = new Blob([noteText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `love-note-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    
    showNotification("Pesan berhasil disimpan! 💾");
}

function updateNotesHistory() {
    const historyList = document.getElementById('notesHistory');
    if (!historyList) return;
    
    if (notesHistory.length === 0) {
        historyList.innerHTML = '<p class="empty-history">Belum ada history love notes.</p>';
        return;
    }
    
    let html = '';
    notesHistory.forEach((item, index) => {
        if (index < 5) { // Show only last 5
            const date = new Date(item.date).toLocaleTimeString('id-ID', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            
            html += `
                <div class="history-item">
                    <div class="history-text">${item.note.substring(0, 50)}...</div>
                    <div class="history-time">${date}</div>
                </div>
            `;
        }
    });
    
    historyList.innerHTML = html;
}

// ============================================
// SLIDESHOW SYSTEM
// ============================================
let currentSlideIndex = 0;
let slideshowInterval = null;
let isPlaying = false;

function initializeSlideshow() {
    if (folderData.foto.length === 0) return;
    
    // Load first slide
    loadSlide(0);
    
    // Create thumbnails
    createThumbnails();
}

function loadSlide(index) {
    if (index < 0 || index >= folderData.foto.length) return;
    
    currentSlideIndex = index;
    const photo = folderData.foto[index];
    
    document.getElementById('slideImage').src = photo.src;
    document.getElementById('slideTitle').textContent = photo.name;
    document.getElementById('slideDesc').textContent = `Foto kenangan ke-${index + 1}`;
    document.getElementById('currentSlideNumber').textContent = index + 1;
    document.getElementById('totalSlides').textContent = folderData.foto.length;
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

function createThumbnails() {
    const container = document.getElementById('thumbnailsContainer');
    if (!container) return;
    
    let html = '';
    folderData.foto.forEach((photo, index) => {
        html += `
            <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="loadSlide(${index})">
                <img src="${photo.src}" alt="${photo.name}">
                <span class="thumbnail-title">${photo.name}</span>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function nextSlide() {
    let nextIndex = currentSlideIndex + 1;
    if (nextIndex >= folderData.foto.length) nextIndex = 0;
    loadSlide(nextIndex);
}

function prevSlide() {
    let prevIndex = currentSlideIndex - 1;
    if (prevIndex < 0) prevIndex = folderData.foto.length - 1;
    loadSlide(prevIndex);
}

function playPauseSlideshow() {
    const playPauseBtn = document.getElementById('playPause');
    
    if (isPlaying) {
        // Pause
        clearInterval(slideshowInterval);
        playPauseBtn.textContent = '▶️';
        isPlaying = false;
    } else {
        // Play
        const speedSelect = document.getElementById('speedSelect');
        const speed = parseInt(speedSelect.value);
        
        slideshowInterval = setInterval(nextSlide, speed);
        playPauseBtn.textContent = '⏸️';
        isPlaying = true;
    }
}

// ============================================
// FOLDER SYSTEM
// ============================================
function setupFolders() {
    // Setup folder toggles
    const folders = ['foto', 'video', 'pesan', 'secret'];
    
    folders.forEach(folder => {
        const btn = document.getElementById(`${folder}FolderBtn`);
        const content = document.getElementById(`${folder}FolderContent`);
        
        if (btn && content) {
            btn.addEventListener('click', () => {
                const isVisible = content.style.display === 'block';
                content.style.display = isVisible ? 'none' : 'block';
                
                // Load content if not already loaded
                if (!isVisible && content.children.length === 0) {
                    loadFolderContent(folder, content);
                }
            });
        }
    });
}

function loadFolderContent(type, container) {
    let html = '';
    
    if (type === 'foto') {
        folderData.foto.forEach(item => {
            html += `
                <div class="file-item" onclick="openLightbox('${item.src}', 'image')">
                    <span class="file-icon">🖼️</span>
                    <span class="file-name">${item.name}</span>
                    <span class="file-size">${item.size}</span>
                </div>
            `;
        });
    } else if (type === 'video') {
        folderData.video.forEach(item => {
            html += `
                <div class="file-item" onclick="openLightbox('${item.src}', 'video')">
                    <span class="file-icon">🎥</span>
                    <span class="file-name">${item.name}</span>
                    <span class="file-size">${item.size}</span>
                </div>
            `;
        });
    } else if (type === 'pesan') {
        folderData.pesan.forEach(item => {
            html += `
                <div class="pesan-item">
                    <div class="pesan-header">
                        <span class="pesan-sender">${item.sender}</span>
                        <span class="pesan-date">${item.date}</span>
                    </div>
                    <div class="pesan-content">${item.content}</div>
                </div>
            `;
        });
    } else if (type === 'secret') {
        folderData.secret.forEach(item => {
            html += `
                <div class="file-item" onclick="openLightbox('${item.src}', 'video')">
                    <span class="file-icon">🔒</span>
                    <span class="file-name">${item.name}</span>
                    <span class="file-size">${item.size}</span>
                </div>
            `;
        });
    }
    
    container.innerHTML = html;
}

// ============================================
// LIGHTBOX SYSTEM
// ============================================
function openLightbox(src, type) {
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightboxContent');
    
    if (type === 'image') {
        lightboxContent.innerHTML = `<img src="${src}" alt="Gambar">`;
    } else if (type === 'video') {
        lightboxContent.innerHTML = `
            <video controls autoplay>
                <source src="${src}" type="video/mp4">
                Browser kamu tidak mendukung video.
            </video>
        `;
    }
    
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    const lightboxContent = document.getElementById('lightboxContent');
    lightboxContent.innerHTML = '';
}

// ============================================
// MUSIC CONTROL
// ============================================
function setupMusicControl() {
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    
    if (musicBtn && bgMusic) {
        musicBtn.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play();
                musicBtn.textContent = '🔊';
            } else {
                bgMusic.pause();
                musicBtn.textContent = '🔈';
            }
        });
    }
}

// ============================================
// FALLING HEARTS EFFECT
// ============================================
function createFallingHearts() {
    const container = document.getElementById('heartContainer');
    const hearts = ['❤️', '💖', '💕', '💗', '💓', '💞'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        
        // Random position
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        
        // Random animation duration
        const duration = Math.random() * 5 + 3;
        heart.style.animationDuration = duration + 's';
        
        container.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
            }
        }, duration * 1000);
    }, 300);
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #ff4d6d;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(255, 77, 109, 0.3);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        font-weight: 500;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// EVENT LISTENERS BARU UNTUK FITUR JAWABAN
// ============================================
function setupEventListeners() {
    // Submit answers
    const submitAllAnswersBtn = document.getElementById('submitAllAnswers');
    if (submitAllAnswersBtn) {
        submitAllAnswersBtn.addEventListener('click', saveAllAnswers);
    }
    
    // Refresh answers
    const refreshAnswersBtn = document.getElementById('refreshAnswers');
    if (refreshAnswersBtn) {
        refreshAnswersBtn.addEventListener('click', () => {
            filterAnswers();
            showNotification("Jawaban diperbarui!");
        });
    }
    
    // Export answers
    const exportAnswersBtn = document.getElementById('exportAnswersBtn');
    if (exportAnswersBtn) {
        exportAnswersBtn.addEventListener('click', exportAnswersToCsv);
    }
    
    // Reset answers
    const resetAnswersBtn = document.getElementById('resetAnswersBtn');
    if (resetAnswersBtn) {
        resetAnswersBtn.addEventListener('click', resetAllAnswers);
    }
    
    // Filter answers
    const filterUser = document.getElementById('filterUser');
    if (filterUser) {
        filterUser.addEventListener('change', filterAnswers);
    }
    
    const filterQuestion = document.getElementById('filterQuestion');
    if (filterQuestion) {
        filterQuestion.addEventListener('change', filterAnswers);
    }
    
    // Admin questions
    const addQuestionBtn = document.getElementById('addQuestionBtn');
    if (addQuestionBtn) {
        addQuestionBtn.addEventListener('click', addNewQuestion);
    }
    
    const saveAllBtn = document.getElementById('saveAllBtn');
    if (saveAllBtn) {
        saveAllBtn.addEventListener('click', saveAllQuestions);
    }
    
    // Love notes
    const generateNoteBtn = document.getElementById('generateNote');
    if (generateNoteBtn) {
        generateNoteBtn.addEventListener('click', generateLoveNote);
    }
    
    const copyNoteBtn = document.getElementById('copyNote');
    if (copyNoteBtn) {
        copyNoteBtn.addEventListener('click', copyNote);
    }
    
    const saveNoteBtn = document.getElementById('saveNote');
    if (saveNoteBtn) {
        saveNoteBtn.addEventListener('click', saveNote);
    }
    
    // Slideshow controls
    const prevSlideBtn = document.getElementById('prevSlide');
    if (prevSlideBtn) {
        prevSlideBtn.addEventListener('click', prevSlide);
    }
    
    const nextSlideBtn = document.getElementById('nextSlide');
    if (nextSlideBtn) {
        nextSlideBtn.addEventListener('click', nextSlide);
    }
    
    const playPauseBtn = document.getElementById('playPause');
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', playPauseSlideshow);
    }
    
    const speedSelect = document.getElementById('speedSelect');
    if (speedSelect) {
        speedSelect.addEventListener('change', () => {
            if (isPlaying) {
                clearInterval(slideshowInterval);
                const speed = parseInt(speedSelect.value);
                slideshowInterval = setInterval(nextSlide, speed);
            }
        });
    }
    
    // Lightbox close
    const closeLightboxBtn = document.getElementById('closeLightbox');
    if (closeLightboxBtn) {
        closeLightboxBtn.addEventListener('click', closeLightbox);
    }
    
    // Click outside lightbox to close
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
}

// ============================================
// INITIALIZATION
// ============================================
function loadAllData() {
    // Setup semua sistem
    setupMusicControl();
    setupFolders();
    setupEventListeners();
    createFallingHearts();
    
    // Load data untuk semua fitur
    updateNotesHistory();
    
    if (currentUser) {
        loadQuestionsForAnswer();
        loadMyAnswers();
        
        if (currentUser.isAdmin) {
            loadQuestionsForAdmin();
            loadAdminAnswers();
            loadAdminStats();
        }
    }
}

// Inisialisasi halaman dashboard saat pertama kali
document.addEventListener('DOMContentLoaded', () => {
    // Setup default halaman
    showPage('dashboard');
    
    // Preload first slide image
    if (folderData.foto.length > 0) {
        const img = new Image();
        img.src = folderData.foto[0].src;
    }
});