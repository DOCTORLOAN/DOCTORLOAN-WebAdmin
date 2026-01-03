# Hướng dẫn thiết lập CI/CD cho DOCTORLOAN-WebAdmin

Tài liệu này hướng dẫn cách thiết lập và cấu hình CI/CD (Continuous Integration/Continuous Deployment) pipeline cho project DOCTORLOAN-WebAdmin (React.js) với chuẩn hóa code, clean code, security scanning, performance analysis, **React validation** và tự động tạo GitHub Issues.

## 📋 Tổng quan

Project sử dụng **GitHub Actions** để tự động kiểm tra code quality và **React validation** trên **TẤT CẢ CÁC BRANCH**:
- ✅ Build và test code
- ✅ Kiểm tra code formatting (Prettier)
- ✅ Kiểm tra code style (ESLint)
- ✅ TypeScript type checking
- ✅ **Security scanning** (npm audit, hardcoded secrets, vulnerable packages)
- ✅ **Performance analysis** (bundle size, code complexity, React optimizations)
- ✅ **Build validation** (React build, bundle analysis)
- ✅ **Testing** (Jest, React Testing Library)
- ✅ **Tự động tạo GitHub Issues** với severity labels
- ✅ Code smells detection
- ✅ Comprehensive reporting

## 🚀 Workflow Structure

### `.github/workflows/ci.yml` - CI Pipeline

Workflow được chia thành các **parallel jobs** để tối ưu thời gian chạy:

1. **Code Quality & Formatting** (Job 1)
   - Prettier formatting verification
   - ESLint validation
   - TypeScript type checking
   - Code smells detection

2. **Build & Bundle Analysis** (Job 2) - **React-specific**
   - React build validation
   - Bundle size analysis
   - Chunk analysis
   - Build warnings/errors tracking

3. **Security Scanning** (Job 3) - Chạy song song với Job 1
   - npm audit (vulnerability scanning)
   - Hardcoded secrets detection (bao gồm REACT_APP_*)
   - Outdated dependencies check

4. **Testing** (Job 4) - Chạy song song
   - Jest test execution
   - Test coverage reporting
   - Test results analysis

5. **Performance Analysis** (Job 5) - Chạy song song
   - Code complexity analysis
   - React performance anti-patterns detection
   - Bundle optimization suggestions

6. **Create GitHub Issues** (Job 6) - Chạy sau khi các jobs khác hoàn thành
   - Tự động tạo issues từ security findings
   - Tự động tạo issues từ performance findings
   - Phân loại severity: Critical, High, Medium, Low, Enhancement

7. **Generate Quality Report** (Job 7)
   - Tổng hợp báo cáo từ tất cả các jobs
   - Hiển thị summary trong GitHub Actions
   - React-specific metrics và statistics

### Trigger Events

- **Push** vào bất kỳ branch nào (`**`)
- **Pull Request** vào bất kỳ branch nào
- **Manual trigger** (workflow_dispatch)

## ⚙️ Cấu hình

### Files cấu hình

1. **`.prettierrc`** - Prettier configuration
   - Code formatting rules
   - Print width, tab width
   - Quote style, semicolons
   - JSX formatting

2. **`package.json`** - Project configuration
   - Dependencies và devDependencies
   - Scripts (lint, format, build, test)
   - ESLint configuration
   - Browserslist configuration

3. **`tsconfig.json`** - TypeScript configuration
   - Compiler options
   - Path aliases
   - Type checking rules

4. **`eslintConfig`** (trong package.json) - ESLint configuration
   - React app ESLint rules
   - Jest ESLint rules

5. **`.env` files** - Environment configuration
   - Development environment variables
   - Staging environment variables
   - Production environment variables
   - **Lưu ý**: Không commit secrets vào repository

### Scripts hỗ trợ

Scripts có thể được thêm vào `.github/scripts/`:
- `create-github-issue.py` - Tạo GitHub Issues
- `parse-security-issues.js` - Parse security findings
- `parse-performance-issues.js` - Parse performance findings

### npm Packages

Project sử dụng các packages sau cho code quality và testing:
- `prettier` - Code formatting
- `eslint` - Code linting (via react-scripts)
- `typescript` - Type checking
- `@testing-library/react` - React component testing
- `@testing-library/jest-dom` - Jest DOM matchers
- `jest` - Testing framework (via react-scripts)

### GitHub Permissions

Workflow cần các permissions sau:
- `contents: read` - Đọc code
- `issues: write` - Tạo issues
- `security-events: write` - Security scanning (optional)

**Lưu ý**: `GITHUB_TOKEN` được tự động cung cấp bởi GitHub Actions, không cần cấu hình thêm.

## 🔒 Security Scanning

### 1. npm Audit Vulnerability Scanning

Pipeline tự động kiểm tra các package có lỗ hổng bảo mật:

```bash
npm audit --audit-level=moderate
```

**Severity Classification:**
- **Critical**: Vulnerable packages với CVSS score critical
- **High**: Vulnerable packages với CVSS score high
- **Medium**: Vulnerable packages với CVSS score moderate

**Gợi ý**: Update packages lên phiên bản mới nhất không có lỗ hổng.

### 2. Hardcoded Secrets Detection

Pipeline quét code để tìm hardcoded secrets:

- Passwords
- API keys
- Tokens
- **REACT_APP_* secrets** (đặc biệt quan trọng cho React apps)

**Severity Classification:**
- **Critical**: Hardcoded secrets trong production code

**Gợi ý**: 
- Sử dụng environment variables (`.env` files)
- Không commit `.env` files vào repository
- Sử dụng `.env.example` để document required variables
- Sử dụng secret management services cho production

### 3. Outdated Dependencies Check

Pipeline kiểm tra các packages đã lỗi thời:

```bash
npm outdated
```

**Severity Classification:**
- **Low**: Outdated packages (có thể có security updates)

**Gợi ý**: 
- Update packages định kỳ
- Kiểm tra changelog trước khi update
- Test kỹ sau khi update major versions

## ⚡ Performance Analysis

### 1. Bundle Size Analysis

Pipeline phân tích:
- Total bundle size
- Chunk count
- Largest chunks
- Bundle size warnings (> 5MB)

**Severity Classification:**
- **High**: Bundle size > 5MB
- **Medium**: Bundle size > 3MB
- **Enhancement**: Bundle size optimization suggestions

**Gợi ý**: 
- Code splitting
- Lazy loading components
- Tree shaking
- Remove unused dependencies
- Optimize images và assets

### 2. Code Complexity Analysis

Pipeline phân tích:
- Files quá dài (>500 lines)
- Components quá phức tạp
- Cyclomatic complexity

**Severity Classification:**
- **Enhancement**: Large files, high complexity

**Gợi ý**: 
- Chia nhỏ components thành các components nhỏ hơn
- Extract custom hooks
- Apply React best practices

### 3. React Performance Anti-patterns Detection

Pipeline phát hiện:
- **Inline styles** (performance issue)
- **Missing React.memo** cho components không cần re-render
- **Missing useMemo/useCallback** cho expensive operations
- **Unnecessary re-renders**

**Severity Classification:**
- **Medium**: Inline styles, missing memoization
- **Low**: Missing React.memo
- **Enhancement**: Performance optimization suggestions

**Gợi ý**:
- Sử dụng CSS modules hoặc styled-components thay vì inline styles
- Sử dụng React.memo cho components không cần frequent re-renders
- Sử dụng useMemo/useCallback cho expensive operations
- Optimize re-renders với React DevTools Profiler

## 🎨 Code Quality Checks

### 1. Prettier Formatting

Pipeline sử dụng Prettier để kiểm tra code formatting:

```bash
npm run lint
```

**Nếu fail:**
- Chạy `npm run format` để tự động fix
- Commit và push lại

### 2. ESLint Validation

Pipeline chạy ESLint để phát hiện:
- Code style violations
- Potential bugs
- React best practices violations
- Accessibility issues

**Nếu có errors:**
- Fix ESLint errors trước khi merge
- Errors được đếm và hiển thị trong report

### 3. TypeScript Type Checking

Pipeline chạy TypeScript compiler để kiểm tra:
- Type errors
- Type safety
- Missing type definitions

**Nếu fail:**
- Fix TypeScript errors
- Add type definitions nếu cần
- Sử dụng `any` chỉ khi thực sự cần thiết

### 4. Code Smells Detection

Pipeline phát hiện:
- TODO/FIXME comments
- console.log statements
- debugger statements

**Severity Classification:**
- **Low**: TODO/FIXME comments, console.log
- **Medium**: debugger statements

**Gợi ý**:
- Fix hoặc remove TODO/FIXME comments
- Remove console.log statements (sử dụng proper logging)
- Remove debugger statements

## 🧪 Testing

### 1. Jest Test Execution

Pipeline chạy Jest tests:

```bash
npm test -- --watchAll=false
```

**Test Coverage:**
- Unit tests cho components
- Integration tests cho features
- Snapshot tests (nếu có)

**Gợi ý**:
- Viết tests cho tất cả components
- Maintain test coverage > 80%
- Test edge cases và error scenarios

### 2. React Testing Library

Pipeline sử dụng React Testing Library để:
- Test component behavior
- Test user interactions
- Test accessibility

**Best Practices:**
- Test behavior, không test implementation
- Test từ user perspective
- Use accessible queries

## 📊 GitHub Issues Auto-Creation

### Severity Labels

Pipeline tự động tạo issues với các labels sau:

- **severity:critical** (🔴 Red) - Issues nghiêm trọng cần fix ngay
- **severity:high** (🟠 Orange) - Issues quan trọng nên fix sớm
- **severity:medium** (🟡 Yellow) - Issues nên được xem xét
- **severity:low** (🟢 Green) - Issues ít ưu tiên
- **severity:enhancement** (🔵 Blue) - Gợi ý cải thiện

### Type Labels

- **type:security** - Security issues
- **type:performance** - Performance issues
- **type:code_quality** - Code quality issues
- **type:react** - React-specific issues

### Issue Format

Mỗi issue tự động được tạo với:

- **Title**: Mô tả ngắn gọn vấn đề
- **Body**: 
  - Description chi tiết
  - Severity và Type
  - File và line number (nếu có)
  - Recommendation
  - Link đến workflow run
- **Labels**: Severity và Type labels

### Duplicate Prevention

Pipeline tự động kiểm tra và tránh tạo issues trùng lặp dựa trên:
- Title matching
- Same severity
- Same file location

## 📝 Sử dụng CI

### Tự động kiểm tra

1. **Push code lên bất kỳ branch nào**:
   ```bash
   git checkout your-branch
   git add .
   git commit -m "Your commit message"
   git push origin your-branch
   ```

2. **GitHub Actions tự động chạy**:
   - Tất cả các jobs chạy song song (code-quality, build-analysis, security-scan, testing, performance-analysis)
   - Tự động tạo issues cho security, performance và code quality findings
   - Generate comprehensive report

3. **Xem kết quả**:
   - Vào tab **Actions** trong GitHub repository
   - Click vào workflow run để xem chi tiết
   - Xem **Summary** tab để xem comprehensive report
   - Xem **Issues** tab để xem các issues được tạo tự động
   - ✅ Xanh = Pass (code clean, build successful)
   - ❌ Đỏ = Fail (cần sửa lỗi)

### Manual trigger

1. Vào **Actions** tab trong GitHub repository
2. Chọn workflow "CI Pipeline - Code Quality, Security, Performance & React Validation"
3. Click **Run workflow** → Chọn branch → **Run workflow**

## ✅ Code Quality Checks

### 1. Code Formatting (Prettier)

Pipeline sử dụng Prettier để kiểm tra code formatting:

```bash
npm run lint
```

**Nếu fail:**
- Chạy `npm run format` để tự động fix
- Commit và push lại

### 2. ESLint Validation

Pipeline chạy ESLint để phát hiện:
- Code style violations
- Potential bugs
- React best practices violations
- Accessibility issues

**Nếu có errors:**
- Fix ESLint errors trước khi merge
- Errors được đếm và hiển thị trong report

### 3. TypeScript Type Checking

Pipeline chạy TypeScript compiler để kiểm tra:
- Type errors
- Type safety
- Missing type definitions

**Nếu fail:**
- Fix TypeScript errors
- Add type definitions nếu cần

### 4. Build Validation

Pipeline build application để kiểm tra:
- Build errors
- Build warnings
- Bundle size

**Nếu fail:**
- Xem build logs để tìm lỗi cụ thể
- Fix build errors trước khi merge

## 🛠️ Fix Code Issues Locally

### Format code tự động

```bash
# Format toàn bộ code
npm run format

# Check formatting
npm run lint
```

### Run ESLint

```bash
# Run ESLint
npx eslint . --ext .js,.jsx,.ts,.tsx

# Fix auto-fixable issues
npx eslint . --ext .js,.jsx,.ts,.tsx --fix
```

### TypeScript type checking

```bash
# Run TypeScript type checking
npx tsc --noEmit
```

### Build và kiểm tra

```bash
# Build application
npm run build

# Check build output
ls -lh build/static/js
```

### Kiểm tra npm vulnerabilities

```bash
# Run npm audit
npm audit

# Fix vulnerabilities
npm audit fix

# Fix vulnerabilities (including breaking changes)
npm audit fix --force
```

### Chạy tests

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

### Test locally

```bash
# Start development server
npm start

# Build for production
npm run build

# Serve production build
npx serve -s build
```

## 📊 Quality Report

Mỗi lần CI chạy, một **Comprehensive Code Quality & React Validation Report** được tạo tự động với:

### Code Quality Section
- ESLint Errors và Warnings count
- TypeScript errors
- Code smells (TODO/FIXME, console.log, debugger)

### Build Analysis Section
- Build status
- Bundle size (MB)
- Chunk count
- Bundle size warnings

### Security Section
- Total security issues
- Critical và High severity issues count
- Vulnerable packages
- Hardcoded secrets
- Outdated dependencies

### Performance Section
- Total performance issues
- Large files
- React performance anti-patterns
- Bundle optimization suggestions

### Testing Section
- Test execution status
- Test coverage (nếu có)

Xem report trong **Actions** → Workflow run → **Summary** tab.

## 🔍 Monitoring và Debugging

### Xem logs

- Vào **Actions** tab trong GitHub repository
- Click vào workflow run để xem chi tiết từng step
- Download artifacts để xem chi tiết logs:
  - `code-quality-logs` - Code quality analysis logs
  - `build-artifacts` - Build output và bundle analysis
  - `security-logs` - Security scanning logs
  - `test-results` - Test execution logs
  - `performance-logs` - Performance analysis logs

### Xem GitHub Issues

- Vào **Issues** tab trong GitHub repository
- Filter theo labels:
  - `severity:critical` - Critical issues
  - `type:security` - Security issues
  - `type:performance` - Performance issues
  - `type:react` - React-specific issues

### Common issues

1. **Build fails**:
   - Kiểm tra dependencies trong `package.json`
   - Kiểm tra Node.js version (phải là 18.x hoặc 19.x)
   - Xem build logs để tìm lỗi cụ thể
   - Kiểm tra TypeScript errors

2. **Formatting fails**:
   - Chạy `npm run format` để tự động fix
   - Commit và push lại

3. **ESLint errors**:
   - Fix ESLint errors
   - Sử dụng `--fix` flag để auto-fix nếu có thể
   - Review ESLint rules nếu cần

4. **TypeScript errors**:
   - Fix TypeScript type errors
   - Add type definitions nếu cần
   - Sử dụng type assertions cẩn thận

5. **Security warnings**:
   - Review hardcoded secrets - di chuyển sang environment variables
   - Update vulnerable packages
   - Run `npm audit fix`

6. **Performance warnings**:
   - Optimize bundle size
   - Fix React performance anti-patterns
   - Implement code splitting

7. **Test failures**:
   - Fix failing tests
   - Update snapshots nếu cần
   - Improve test coverage

8. **Issues không được tạo**:
   - Kiểm tra GitHub permissions
   - Kiểm tra GITHUB_TOKEN có được set không
   - Xem logs trong create-issues job

## 📚 Best Practices

### Trước khi push code

1. **Format code**:
   ```bash
   npm run format
   ```

2. **Run ESLint**:
   ```bash
   npx eslint . --ext .js,.jsx,.ts,.tsx
   ```

3. **TypeScript type checking**:
   ```bash
   npx tsc --noEmit
   ```

4. **Build locally**:
   ```bash
   npm run build
   ```

5. **Run tests**:
   ```bash
   npm test -- --watchAll=false
   ```

6. **Kiểm tra security**:
   ```bash
   npm audit
   ```

7. **Review code smells**:
   - Fix TODO/FIXME comments
   - Remove console.log statements
   - Remove debugger statements

8. **Commit và push**:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin your-branch
   ```

### Pull Request Workflow

1. Tạo branch từ main/develop
2. Code và commit changes
3. Push branch lên GitHub
4. Tạo Pull Request
5. CI sẽ tự động chạy và kiểm tra code
6. Review **Quality Report** trong PR
7. Review các **Issues** được tạo tự động
8. Fix issues nếu có
9. Chỉ merge khi CI pass ✅

### Code Quality Guidelines

1. **Naming Conventions**:
   - Components: PascalCase
   - Functions, variables: camelCase
   - Constants: UPPER_SNAKE_CASE
   - Files: PascalCase cho components, camelCase cho utilities

2. **Code Style**:
   - Sử dụng functional components
   - Sử dụng hooks thay vì class components
   - Sử dụng TypeScript cho type safety
   - Prefer arrow functions cho event handlers

3. **Security Best Practices**:
   - Không hardcode secrets
   - Sử dụng environment variables
   - Validate user input
   - Sanitize data trước khi render
   - Keep packages updated

4. **Performance Best Practices**:
   - Use React.memo cho components không cần frequent re-renders
   - Use useMemo/useCallback cho expensive operations
   - Implement code splitting
   - Lazy load components
   - Optimize images và assets
   - Avoid inline styles

5. **Maintainability**:
   - Keep components small và focused
   - Extract custom hooks
   - Use TypeScript cho type safety
   - Write clear comments cho complex logic
   - Follow React best practices

### React Best Practices

1. **Component Structure**:
   - Keep components small và focused
   - Extract reusable logic vào custom hooks
   - Use composition over inheritance
   - Follow single responsibility principle

2. **State Management**:
   - Use local state khi có thể
   - Use Context API cho global state
   - Consider state management libraries nếu cần

3. **Performance**:
   - Use React.memo để prevent unnecessary re-renders
   - Use useMemo/useCallback cho expensive operations
   - Implement code splitting
   - Lazy load routes và components

4. **Testing**:
   - Write tests cho components
   - Test user interactions
   - Test edge cases
   - Maintain test coverage > 80%

5. **Accessibility**:
   - Use semantic HTML
   - Add ARIA labels khi cần
   - Test với screen readers
   - Ensure keyboard navigation

## 🎯 Gợi ý Tối Ưu Hóa Code

CI pipeline tự động phát hiện và gợi ý các cải tiến:

### Performance Optimizations

- **Bundle size**: Code splitting, lazy loading, tree shaking
- **Re-renders**: React.memo, useMemo, useCallback
- **Images**: Optimize images, use WebP format
- **Assets**: Minimize CSS, remove unused code
- **API calls**: Implement caching, debouncing, throttling

### Code Structure

- **Large components**: Chia nhỏ components
- **Complex logic**: Extract custom hooks
- **Duplication**: Extract common code
- **Type safety**: Use TypeScript properly

### Security

- **Secrets management**: Use environment variables
- **Input validation**: Validate all user input
- **XSS prevention**: Sanitize data before rendering
- **Package updates**: Keep packages updated

### Maintainability

- **Documentation**: Add comments cho complex logic
- **Naming**: Use descriptive names
- **TypeScript**: Use proper types
- **Tests**: Write comprehensive tests

### React-Specific Optimizations

- **Component optimization**: Use React.memo, useMemo, useCallback
- **Code splitting**: Lazy load routes và components
- **Bundle optimization**: Remove unused dependencies
- **Image optimization**: Use optimized images, lazy loading
- **CSS optimization**: Use CSS modules, remove unused styles

## 🔧 Tối ưu Workflow

Workflow được tối ưu với:

1. **Parallel Jobs**: Các jobs chạy song song để giảm thời gian
2. **Caching**: Cache npm packages để tăng tốc install
3. **Artifacts**: Upload logs và findings để review sau
4. **Conditional Execution**: Một số steps chỉ chạy khi cần
5. **Timeout**: Set timeout cho mỗi job để tránh hang

## 🎯 Next Steps

1. ✅ Push code lên bất kỳ branch nào để test CI
2. ✅ Xem kết quả trong Actions tab
3. ✅ Review Quality Report
4. ✅ Review GitHub Issues được tạo tự động
5. ✅ Fix các issues theo severity
6. ✅ Đảm bảo CI pass trước khi merge
7. ✅ Cải thiện code quality và React best practices dựa trên gợi ý
8. ✅ Thêm unit tests và integration tests
9. ✅ Cải thiện test coverage
10. ✅ Optimize bundle size và performance

## 📖 Tài liệu tham khảo

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [ESLint Documentation](https://eslint.org/docs/latest/)
- [Prettier Documentation](https://prettier.io/docs/en/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/react)
- [GitHub Actions](https://docs.github.com/en/actions)
- [npm Documentation](https://docs.npmjs.com/)
- [React Best Practices](https://react.dev/learn)
- [Web Performance Best Practices](https://web.dev/performance/)

---

**Lưu ý**: CI pipeline này chạy trên **TẤT CẢ CÁC BRANCH** để đảm bảo code quality và React best practices nhất quán trong toàn bộ project. Security, Performance và Code quality issues sẽ được tự động tạo thành GitHub Issues với severity labels để dễ dàng tracking và fixing.

