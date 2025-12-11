# Mini Udemy + Mini Uber Sistemi

Üç ana modülden oluşan full-stack web uygulaması:

1. **Kullanıcı Yönetimi** (3 Rol: Öğrenci, Eğitmen, Admin)
2. **Mini Udemy Akışı** (Kurs Satın Alma + Wallet Sistemi)
3. **Mini Uber Mantığı** (Eğitmen-Öğrenci Eşleştirme)

---

### 1. Gereksinimler

- Node.js 18+
- npm veya yarn

### 2. Kurulum

```bash
# Bağımlılıkları yükle
npm install


npm run dev
```

### 3. Tarayıcıda Aç

```
http://localhost:3000/login
```

### 4. Test Kredileri

| Rol     | Kullanıcı Adı | Şifre |
| ------- | ------------- | ----- |
| Öğrenci | ogrenci       | 123   |
| Eğitmen | egitmen       | 123   |
| Admin   | admin         | 123   |

---

## Proje Yapısı

```
gt-case/
├── app/
│   ├── api/
│   │   ├── auth/login/
│   │   ├── courses/purchase/
│   │   ├── match/request/
│   │   └── dashboard/data/
│   ├── (auth)/login/page.tsx     # Login sayfası
│   ├── dashboard/page.tsx        # dashboard
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── CourseCard.tsx
│   ├── PurchasedCourseCard.tsx
│   ├── LessonRequestForm.tsx
│   ├── RequestsList.tsx
│   └── ProtectedRoute.tsx
├── types/index.ts
├── lib/db.ts
├── data/db.json





## Temel Özellikler

### Modül 1: Kullanıcı Yönetimi

- 3 Rol: user (öğrenci), instructor (eğitmen), admin
- Mock JSON veri tabanı
- localStorage ile session yönetimi
- Protected routes

### Modül 2: Kurs Satın Alma

- 2 örnek kurs
- Wallet bakiyesi kontrolü
- Duplikat satın alma kontrolü
- Satın Aldığım Eğitimler listesi

### Modül 3: Eğitmen Eşleştirme

- Canlı ders talep oluşturma
- Otomatik eğitmen atama
- Bildirim simülasyonu
- Talep listesi ve durum takibi

---

## Teknoloji Stack

| Katman       | Teknoloji                     |
| ------------ | ----------------------------- |
| **Frontend** | Next.js 14, React, TypeScript |
| **Styling**  | Tailwind CSS                  |
| **Backend**  | Next.js API Routes            |
| **Database** | JSON (Mock)                   |
| **State**    | React Hooks + localStorage    |

---

## API Endpoints


```

POST /api/auth/login

- Body: { username: string, password: string }
- Response: { success: true, user: User }

```

### Courses

```

POST /api/courses/purchase

- Body: { userId: number, courseId: number }
- Response: { success: true, message: string, remainingBalance: number }

GET /api/dashboard/data

- Response: { courses: Course[], matchRequests: MatchRequest[] }

```

### Matching

```

POST /api/match/request

- Body: { studentId: number, topic: string }
- Response: { success: true, matchDetails: MatchRequest }

```

---

## Güvenlik Özellikleri

- ✅ Protected routes (ProtectedRoute component)
- ✅ localStorage kontrolleri
- ✅ Backend validasyon
- ✅ TypeScript type safety
- ✅ Error handling


#
```
