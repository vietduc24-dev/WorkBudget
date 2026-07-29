# Web-B & Project Overview Code Rules & Architecture Guidelines

Document này tổng hợp kiến thức kiến trúc, quy chuẩn lập trình và mẫu thiết kế (design patterns) được sử dụng trong dự án `apps/web-b`, đặc biệt tập trung vào phân hệ `overview` tại `src/app/(protected)/project/[project_id]/overview`.

---

## 1. Công nghệ & Thư viện sử dụng (Tech Stack)

- **Framework**: Next.js App Router (Next 16, React 19, Turbopack).
- **Ngôn ngữ**: TypeScript (`strict` mode).
- **Styling & UI**:
  - Tailwind CSS v4 (`@tailwindcss/postcss`)
  - Shared UI library `@workspace/ui` (dựa trên Radix UI + shadcn/ui)
  - `lucide-react` icons, `sonner` (Toast notifications)
- **Quản lý State & Form**:
  - **Zustand** kết hợp **Immer** (`produce`) cho UI & Feature State.
  - **React Hook Form** kết hợp **Zod** (`zodResolver`) cho Form & Validation.
- **HTTP Client & API**:
  - Axios instance cấu hình tại `@/services/http`.
  - API Modules định nghĩa theo domain tại `@/apis/`.

---

## 2. Cấu trúc thư mục (Directory Structure)

```text
src/
├── apis/                   # Định nghĩa API calls theo từng miền (project, user, auth, ...)
├── app/                    # Next.js App Router
│   └── (protected)/        # Route group dành cho các trang yêu cầu đăng nhập
│       └── project/
│           └── [project_id]/
│               └── overview/ # Phân hệ Overview của Project
│                   ├── _components/         # Component chung cấp overview (e.g.project-tabs)
│                   ├── customer-info/       # Feature: Thông tin khách hàng
│                   │   ├── _components/     # UI Component nội bộ (Form, View)
│                   │   ├── _hooks/          # Hook, Store, Schema nội bộ
│                   │   ├── CustomerInfoPage.tsx # Client component chính
│                   │   └── page.tsx         # Next.js page route (Permission guard & Metadata)
│                   ├── property-info/       # Feature: Thông tin bất động sản
│                   ├── zoning-info/         # Feature: Thông tin quy hoạch
│                   ├── registration-data/   # Feature: Dữ liệu đăng ký
│                   ├── existing-data/       # Feature: Dữ liệu hiện trạng
│                   └── ...
├── components/             # Reusable UI components & PermissionGuard
├── constants/              # Hằng số (message, permissions, common)
├── hooks/                  # Custom hooks dùng chung (usePermission, useConfirmDialog, ...)
├── layouts/                # Wrapper layouts
├── services/               # Cấu hình HTTP service (Axios wrapper)
├── stores/                 # Zustand stores toàn cục
├── types/                  # TypeScript interfaces & types theo domain
└── utils/                  # Utility functions (helpers, format, date)
```

---

## 3. Kiến trúc Mô-đun (Module Pattern: Page - Hook - Store)

Mỗi feature con nằm trong `overview` (ví dụ: `customer-info`, `zoning-info`, `property-info`) tuân theo **Mẫu kiến trúc chuẩn 4 lớp**:

### Lớp 1: Route Entry (`page.tsx`)
- Khai báo Metadata (`export const metadata`).
- Bọc Page bằng `<PermissionGuard feature={PERMISSION_FEATURES.FEATURE_NAME}>`.
- Export default Server Component render Client Page Component (`CustomerInfoPage`).

### Lớp 2: Client Page Container (`[Feature]Page.tsx`)
- Đánh dấu `'use client'`.
- Quản lý layout chính (`ProjectHeader`, `ProjectTabs`, `SpinnerContent`).
- Điều phối chế độ Xem (View) vs Chỉnh sửa (Edit).
- Kết nối nút Chỉnh sửa / Lưu / Hủy ở Header với Form ref (`formRef`).

### Lớp 3: Private UI Components (`_components/`)
- `[Feature]Form.tsx`: Component hiển thị Form. Sử dụng `forwardRef` + `useImperativeHandle` để expose phương thức `submit()` ra bên ngoài (để header bấm nút "Lưu" có thể kích hoạt submit form).
- `[Feature]View.tsx`: Component hiển thị dữ liệu chỉ đọc khi không ở chế độ edit.

### Lớp 4: Private Logic & State (`_hooks/`)
- `[feature].schema.ts`:
  - Khai báo Zod Schema kiểm tra dữ liệu đầu vào.
  - Export TypeScript type suy ra từ schema: `export type FeatureInfo = z.infer<typeof featureSchema>;`
- `[feature].store.ts`:
  - Khai báo Zustand store quản lý state UI (`formData`, `isLoading`, `isEditing`, ...).
  - Sử dụng Immer `produce` để mutate state một cách an toàn.
- `use[Feature].ts`:
  - Custom hook chính xử lý logic nghiệp vụ.
  - Khởi tạo React Hook Form (`useForm({ resolver: zodResolver(schema) })`).
  - Thực hiện gọi API (`projectApis.getCustomerInfo`, `updateCustomerInfo`).
  - Xử lý thông báo thành công (`toast.success`), bắt lỗi (`getObjectError`) và dialog xác nhận (`useConfirmDialog`).

---

## 4. Quy chuẩn Lập trình (Coding Standards & Conventions)

### 4.1 Quy tắc Đặt tên (Naming Conventions)
1. **File & Component Name**:
   - Page Component: `PascalCase.tsx` (ví dụ: `CustomerInfoPage.tsx`, `ZoningInfoPage.tsx`).
   - Form / View Component: `PascalCase.tsx` (ví dụ: `CustomerInfoForm.tsx`, `CustomerInfoView.tsx`).
   - Minor / Common Component: `kebab-case.tsx` (ví dụ: `project-tabs.tsx`).
2. **Hook, Store & Schema**:
   - Custom Hook: `camelCase.ts` bắt đầu bằng `use` (ví dụ: `useCustomerInfo.ts`).
   - Store: `[featureName].store.ts` (ví dụ: `customerInfo.store.ts`).
   - Schema: `[featureName].schema.ts` (ví dụ: `customerInfo.schema.ts`).
3. **Thư mục (Directories)**:
   - Route directory: `kebab-case` (ví dụ: `customer-info`, `property-info`).
   - Thư mục riêng tư nội bộ của route: Bắt đầu bằng dấu gạch dưới `_` (ví dụ: `_components`, `_hooks`, `_types`).

### 4.2 Quản lý State & Form
- Không trộn lẫn state quản lý UI (edit mode, loading) vào React Hook Form. Dùng **Zustand store** cho UI state và **React Hook Form** cho form state.
- Luôn sử dụng **Zod** để định nghĩa validation schema và dùng `zodResolver` gắn vào `useForm`.
- Tách biệt rõ ràng giữa View Component (chỉ hiển thị) và Form Component (nhập liệu).

### 4.3 Phân quyền (Permissions)
- Bọc toàn bộ route bằng `<PermissionGuard feature={...}>` ở `page.tsx`.
- Trong UI component, dùng `usePermission(PERMISSION_FEATURES.X)` để kiểm tra quyền tác động:
  ```tsx
  const { canUpdate, canCreate, canDelete } = usePermission(PERMISSION_FEATURES.CUSTOMER_INFO);
  ```

### 4.4 Xử lý API & Bất đồng bộ
- Mọi API call phải được định nghĩa trong `@/apis/[domain].ts` (ví dụ: `projectApis`).
- Khi thực hiện async call trong custom hook:
  1. Set loading state: `setIsLoading(true)`.
  2. Bọc logic trong block `try / catch / finally`.
  3. Xử lý lỗi chuẩn mực bằng helper `getObjectError(error)`.
  4. Hiển thị thông báo Toast với `toast.success(MESSAGE.UPDATE)` hoặc `toast.error`.
  5. Trong `finally`: Set loading state `setIsLoading(false)`.

### 4.5 Mẫu trigger Form submit từ Header ngoài (`useImperativeHandle`)
Khi nút "Lưu" nằm ở cấp Header của Page nhưng Form lại nằm ở Component con:
```tsx
// 1. Định nghĩa Interface Ref
export interface CustomerInfoRef {
  submit: () => void;
}

// 2. Trong Hook bọc Form
useImperativeHandle(ref, () => ({
  submit: () => {
    form.handleSubmit(onSubmit)();
  },
}), [form, onSubmit]);

// 3. Trong Component Page chính
const formRef = useRef<CustomerInfoRef>(null);
const handleSubmitFromOutside = () => {
  formRef.current?.submit();
};
<Button onClick={handleSubmitFromOutside}>保存</Button>
<CustomerInfoForm ref={formRef} />
```

---

## 5. Danh sách kiểm tra khi Thêm Feature mới vào Overview (Checklist)

Khi phát triển hoặc tái cấu trúc một sub-feature mới trong `overview`:
- [ ] Tạo thư mục mới dạng `kebab-case` trong `overview/`.
- [ ] Tạo `page.tsx` khai báo Metadata & `<PermissionGuard>`.
- [ ] Tạo `_hooks/[feature].schema.ts` định nghĩa Zod Schema & Types.
- [ ] Tạo `_hooks/[feature].store.ts` định nghĩa Zustand Store với Immer.
- [ ] Tạo `_hooks/use[Feature].ts` kết nối RHF, API & Store.
- [ ] Tạo `_components/[Feature]Form.tsx` (sử dụng `forwardRef`) & `_components/[Feature]View.tsx`.
- [ ] Tạo `[Feature]Page.tsx` lắp ghép Layout (`ProjectHeader`, `ProjectTabs`, `Form`, `View`).
- [ ] Kiểm tra phân quyền (`usePermission`), hiệu ứng loading (`SpinnerContent`), và thông báo lỗi.
