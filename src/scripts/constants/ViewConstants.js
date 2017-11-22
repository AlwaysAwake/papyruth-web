'use strict';

export default {
  validationMessages: {
    INPUT_REALNAME: "이름을 입력해주세요",
    INPUT_PASSWORD: "비밀번호를 입력해주세요.",
    INPUT_EVALUATION_SCORE: "각 점수는 필수 입력 항목입니다.",
    INPUT_EVALUATION_BODY: "강의평을 입력해주세요.",
    INPUT_UNIV_EMAIL: "메일을 입력해주세요.",
    REALNAME_TOO_LONG: "실명은 최대 30자 까지 입력할 수 있습니다.",
    NICKNAME_TOO_LONG: "닉네임은 최대 30자 까지 입력할 수 있습니다.",
    HASHTAG_TOO_LONG: "해쉬태그가 너무 깁니다.",
    INVALID_HASHTAGS: "올바른 해쉬태그를 입력해주세요.",
    INVALID_EMAIL: "올바른 형식의 이메일을 입력해주세요.",
    INVALID_UNIV_EMAIL_DOMAIN: "올바른 형식의 대학교 이메일 도메인이 아닙니다.",
    UNIV_EMAIL_ALREADY_EXISTS: "해당 주소로 등록한 사용자가 이미 존재합니다.",
    LEGACY_USER_EXISTS: "해당 주소로 등록한 SNUEV 사용자가 이미 존재합니다. 비밀번호 찾기를 이용하거나 다른 메일로 가입한 후 학교 메일 인증을 진행해주세요.",
    EVALUATION_ALREADY_EXISTS: "선택하신 강의의 강의평가를 이미 작성하셨습니다. 강의 당 강의평가는 하나만 작성할 수 있습니다.",
    PASSWORDS_DOESNT_MATCH: "비밀번호와 비밀번호 확인이 서로 일치하지 않습니다.",
    PASSWORD_TOO_SHORT: "비밀번호는 8자 이상이어야 합니다.",
    PASSWORD_MUST_DIFFER_FROM_PREVIOUS: "새 비밀번호는 이전 비밀번호와 일치할 수 없습니다.",
    HASHTAGS_CANNOT_BE_DUPLICATED: "같은 해쉬태그는 한 번만 등록할 수 있습니다.",
    GENERAL_ERROR: "오류가 발생했습니다. 다시 시도해주세요.",
    SELECT_UNIVERSITY: "대학교를 선택해주세요.",
    SELECT_GENDER: "성별을 선택해주세요.",
    SELECT_COURSE: "강의를 선택해주세요.",
    WRITE_EVALUATION_SUCCESS: "강의평가를 등록하였습니다.",
    UPDATE_EVALUATION_SUCCESS: "강의평가를 수정하였습니다.",
    DELETE_EVALUATION_SUCCESS: "강의평가가 삭제되었습니다.",
    FAVORITE_COURSE_ADD_SUCCESS: "관심강의를 등록하였습니다.",
    FAVORITE_COURSE_REMOVE_SUCCESS: "관심강의 목록에서 제거하였습니다.",
    INFORMATION_CHANGE_SUCCESS: "내 정보 변경에 성공하였습니다.",
    PASSWORD_CHANGE_SUCCESS: "비밀번호 변경에 성공하였습니다.",
    SIGNUP_SUCCESS: "환영합니다. 성공적으로 가입되셨습니다. 인증 메일이 전송되었습니다. 이메일 인증 후 사용해주세요.",
    REGISTER_UNIV_MAIL_SUCCESS: "학교 이메일 주소가 등록되었습니다.",
    SEND_CONFIRM_MAIL_SUCCESS: "인증 메일을 전송하였습니다. 인증 후에 다시 로그인 한 후 이용해주세요.",
    SEND_PASSWORD_RENEW_MAIL_SUCCESS: "비밀번호 찾기 메일을 입력하신 주소로 보냈습니다.",
    SEND_MIGRATE_MAIL_SUCCESS: "SNUEV로 부터 계정 이동 메일을 전송하였습니다.",
    REPORT_EVALUATION_SUCCESS: "강의평이 신고되었습니다.",
    REPORT_COMMENT_SUCCESS: "댓글이 신고되었습니다."
  },
  tooltipSettings: {
    config: {
      multiline: true,
      effect: "solid"
    },
    message: {
      UNIV_EMAIL: "학교 메일 인증은 의무가 아니지만<br />학교 메일 인증을 한 사용자가 작성한 강의평가는<br />학교 메일 인증을 거친 사용자끼리만 볼 수 있습니다."
    }
  },
  Sidebar: {
    items: [
      {
        name: "NAVIGATION",
        properties: [
          { imgPath: "//d2pqv3srin2mqf.cloudfront.net/web_resources/images/sidebar/search.png", hoverImgPath: "//d2pqv3srin2mqf.cloudfront.net/web_resources/images/sidebar/search_h.png", name: "강의검색", flag: "search" },
          { imgPath: "//d2pqv3srin2mqf.cloudfront.net/web_resources/images/sidebar/recent_evaluations.png", hoverImgPath: "//d2pqv3srin2mqf.cloudfront.net/web_resources/images/sidebar/recent_evaluations_h.png", name: "최신강의평가", url: "/"},
          { imgPath: "//d2pqv3srin2mqf.cloudfront.net/web_resources/images/sidebar/favorite_course.png", hoverImgPath: "//d2pqv3srin2mqf.cloudfront.net/web_resources/images/sidebar/favorite_course_h.png", name: "관심강의", flag: "favorite" },
          { imgPath: "//d2pqv3srin2mqf.cloudfront.net/web_resources/images/sidebar/write_evaluation.png", hoverImgPath: "//d2pqv3srin2mqf.cloudfront.net/web_resources/images/sidebar/write_evaluation_h.png", name: "평가하기", url: "/evaluation/write"}
        ]
      },
      {
        name: "ACCOUNT SETTINGS",
        properties: [
          { imgPath: "//d2pqv3srin2mqf.cloudfront.net/web_resources/images/sidebar/myinfo.png", hoverImgPath: "//d2pqv3srin2mqf.cloudfront.net/web_resources/images/sidebar/myinfo_h.png", name: "내 정보", url: "/user/info" }
        ]
      }
    ]
  },
  Searchbar: {
    searchLimit: 10,
    maximumCourseNameLength: 10,
    maximumProfessorNameLength: 10
  },
  Favoritebar: {
    limit: 10
  },
  Signup: {
    UserInfoForm: {
      validation: {
        formClass: {
          initial: "form-group has-feedback",
          success: "form-group has-feedback has-success",
          failure: "form-group has-feedback has-error"
        },
        iconClass: {
          initial: "glyphicon form-control-feedback",
          success: "glyphicon glyphicon-ok form-control-feedback",
          failure: "glyphicon glyphicon-remove form-control-feedback"
        }
      },
      entranceYearSet: [2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003],
      formItems: [
        {
          label: "이메일",
          name: "email",
          placeholder: "",
          type: "email",
          checkDuplicates: true
        },
        {
          label: "비밀번호",
          name: "password",
          placeholder: "8자 이상 입력해주세요.",
          type: "password",
          checkDuplicates: false
        },
        {
          label: "비밀번호 확인",
          name: "confirm_password",
          placeholder: "8자 이상 입력해주세요.",
          type: "password",
          checkDuplicates: false
        },
        {
          label: "이름",
          name: "realname",
          placeholder: "",
          type: "text",
          checkDuplicates: false
        },
        {
          label: "닉네임",
          name: "nickname",
          placeholder: "",
          type: "text",
          checkDuplicates: true
        }
      ]
    },
    migrateAgreementText: "SNUEV에도 동일한 이메일로 아이디를 가지고 계시네요.\n계정 정보를 옮겨올까요?"
  },
  Signin: {
    errorMsg: "아이디와 비밀번호를 올바르게 입력해주세요."
  },
  Course: {
    courseCategory: {
      0: {
        name: "전공",
        color: "#27B5AF"
      },
      1: {
        name: "교양",
        color: "#F39AA5"
      },
      2: {
        name: "기타",
        color: "#0C274C"
      }
    }
  },
  UserInfo: {
    maximumBodyLength: 236,
    maximumContentsLength: 50,
    maximumContentsCount: 3,
    infoItems: {
      email: "이메일",
      realname: "이름",
      nickname: "닉네임",
      entrance_year: "입학년도",
      confirmed: "이메일 인증 여부",
      university_confirmed: "대학 인증 여부"
    },
    ChangeProfile: {
      validation: {
        formClass: {
          initial: "form-group has-feedback",
          success: "form-group has-feedback has-success",
          failure: "form-group has-feedback has-error"
        },
        iconClass: {
          initial: "glyphicon form-control-feedback",
          success: "glyphicon glyphicon-ok form-control-feedback",
          failure: "glyphicon glyphicon-remove form-control-feedback"
        }
      },
      formItems: [
        {
          label: "닉네임",
          name: "nickname",
          placeholder: "",
          type: "text",
          checkDuplicates: true
        }
      ]
    },
    ChangePassword: {
      validation: {
        formClass: {
          initial: "form-group has-feedback",
          success: "form-group has-feedback has-success",
          failure: "form-group has-feedback has-error"
        },
        iconClass: {
          initial: "glyphicon form-control-feedback",
          success: "glyphicon glyphicon-ok form-control-feedback",
          failure: "glyphicon glyphicon-remove form-control-feedback"
        }
      },
      formItems: [
        {
          label: "기존 비밀번호",
          name: "old_password",
          placeholder: "",
          type: "password"
        },
        {
          label: "새 비밀번호",
          name: "new_password",
          placeholder: "8자 이상 입력해주세요.",
          type: "password"
        },
        {
          label: "새 비밀번호 확인",
          name: "confirm_new_password",
          placeholder: "다시 한 번 입력해주세요.",
          type: "password"
        }
      ]
    },
    ItemsNone: {
      contentName: {
        evaluation: "강의평가가",
        comment: "댓글이"
      }
    }
  },
  Home: {
    RecentEvaluations: {
      contentsCountPerRequest: 10,
      maximumBodyLength: 236
    }
  },
  Evaluation: {
    EvaluationsWrapper: {
      evaluationsPerRequest: 10
    },
    EvaluationWriteForm: {
      itemPerRequest: 10,
      initialEvalValue: {
        point_overall: 0,
        point_gpa_satisfaction: 0,
        point_easiness: 0,
        point_clarity: 0,
        body: ""
      },
      initialFormState: {
        point_overall: 'initial',
        point_clarity: 'initial',
        point_easiness: 'initial',
        point_gpa_satisfaction: 'initial',
        body: 'initial'
      },
      completeFormState: {
        point_overall: 'complete',
        point_clarity: 'complete',
        point_easiness: 'complete',
        point_gpa_satisfaction: 'complete',
        body: 'complete'
      },
      formItems: {
        point_overall: {
          name: "총점",
          sliderType: 'star',
          sliderSettings: {
            min: 1,
            max: 10,
            step: 1
          },
          imgPath: "//d2pqv3srin2mqf.cloudfront.net/web_resources/images/evaluation/total_score.png",
          divStyle: {
            borderTop: '2px solid #000000',
            borderBottom: '1px solid #E0E0E0'
          }
        },
        point_clarity: {
          name: "강의력",
          sliderType: 'slider',
          sliderSettings: {
            min: 1,
            max: 10,
            step: 1
          },
          color: '#E05E5F',
          imgPath: "//d2pqv3srin2mqf.cloudfront.net/web_resources/images/evaluation/clarity.png",
          divStyle: {
            borderBottom: '1px solid #E0E0E0'
          }
        },
        point_easiness: {
          name: "널널함",
          sliderType: 'slider',
          sliderSettings: {
            min: 1,
            max: 10,
            step: 1
          },
          color: '#27B5AF',
          imgPath: "//d2pqv3srin2mqf.cloudfront.net/web_resources/images/evaluation/easiness.png",
          divStyle: {
            borderBottom: '1px solid #E0E0E0'
          }
        },
        point_gpa_satisfaction: {
          name: "학점만족도",
          sliderType: 'slider',
          sliderSettings: {
            min: 1,
            max: 10,
            step: 1
          },
          color: '#546B8D',
          imgPath: "//d2pqv3srin2mqf.cloudfront.net/web_resources/images/evaluation/gpa_satisfaction.png",
          divStyle: {
            borderBottom: '2px solid #000000'
          }
        }
      },
      formState: {
        initial: {
          text: "입력해주세요.",
          imgPath: "//d2pqv3srin2mqf.cloudfront.net/web_resources/images/evaluation/field_before_input.png",
          color: "#CCCCCC"
        },
        complete: {
          text: "완료",
          imgPath: "//d2pqv3srin2mqf.cloudfront.net/web_resources/images/evaluation/field_complete.png",
          color: "#39B54A"
        }
      }
    },
    hashtagItem: {
      removeIcon: {
        imgPath: "//d2pqv3srin2mqf.cloudfront.net/web_resources/images/evaluation/delete_tag.png",
        hoverImgPath: "//d2pqv3srin2mqf.cloudfront.net/web_resources/images/evaluation/delete_tag_h.png"
      }
    },
    searchedCourseList: {
      courseCategory: {
        0: {
          name: "전공",
          color: "#27B5AF"
        },
        1: {
          name: "교양",
          color: "#F39AA5"
        },
        2: {
          name: "기타",
          color: "#0C274C"
        }
      },
      maximumProfessorNameLength: 7
    }
  },
  Comment: {
    commentsPerRequest: 10
  },
  EmailAuth: {
    name: "이메일",
    buttonText: "인증 메일 재전송"
  },
  UnivEmailAuth: {
    name: "학교 이메일",
    registerUnivEmailText: "학교 메일 등록 하기",
    sendMailButtonText: "학교 인증 메일 전송"
  }
};
