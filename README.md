# Book Binder with Sequelize

이 프로젝트는 [MySQL 버전 Book Binder](https://github.com/GiHwan-Lee/BookBinder)의 Sequelize 버전입니다. 자세한 기능 설명 및 사용 방법은 원본 프로젝트의 리드미를 참고해주세요.

# API 문서화

본 프로젝트의 API 엔드포인트와 기능은 원본 MySQL 프로젝트와 동일합니다. 내부적인 데이터베이스 접근 방식에서 차이점이 있을 뿐, API 사용 방법은 동일하므로 [MySQL 버전 Book Binder의 포스트맨 문서화](https://documenter.getpostman.com/view/24146598/2s946maqCt)를 참고하시면 됩니다.

# Sequelize 도입 이유 및 장점

## 도입한 이유

프로젝트의 초기 단계에서는 MySQL만을 사용하여 데이터 관리 및 조작을 수행하였습니다. 그러나 프로젝트의 규모가 커지고 데이터 관리가 복잡해짐에 따라 코드의 효율성과 확장성을 개선하기 위해 Sequelize를 도입하기로 결정하였습니다. Sequelize는 강력한 ORM(Object-Relational Mapping) 도구로 데이터베이스 스키마를 자바스크립트 객체로 매핑하여 개발자가 SQL 쿼리를 직접 작성할 필요 없이 데이터베이스 작업을 수행할 수 있게 해줍니다.

## sequelize의 장점

-코드의 간결성: SQL 쿼리를 직접 작성할 필요 없이, 직관적인 메서드를 사용하여 데이터베이스 작업을 수행할 수 있습니다.

-확장성: 다양한 데이터베이스 시스템에 대한 지원을 통해, 필요에 따라 데이터베이스를 교체하는 것이 간편합니다.

-보안: Sequelize는 SQL Injection과 같은 일반적인 보안 위협을 방지하는 데 도움을 줍니다.

-동기화: 모델 변경 사항을 데이터베이스에 자동으로 동기화할 수 있습니다.
