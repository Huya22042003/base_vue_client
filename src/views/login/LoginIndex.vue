<template>
  <div class="login_wrap">
    <div class="login_top">
      <img src="@/assets/images/login/logo_login.png" alt="계원예술대학교" />
    </div>
    <div class="login_box">
      <div class="login_header">
        <img src="@/assets/images/login/img_login_play.png" alt="play" />
        <h3 class="login_logo"><strong>역량기반 교육과정</strong><br />관리시스템</h3>
      </div>
      <div class="login_input">
        <strong>아이디</strong>
        <input type="text" class="form_style wd_p100" placeholder="아이디를 입력하세요" />
      </div>
      <div class="login_input">
        <strong>비밀번호</strong>
        <input type="password" class="form_style wd_p100" placeholder="비밀번호를 입력하세요" />
      </div>
      <div class="login_btn_area">
        <button type="button" class="btn_primary btn_login">LOGIN</button>
      </div>
      <div class="remember_id">
        <div class="check_row">
          <input type="checkbox" name="join_check" id="join_check1" class="hidden" />
          <label for="join_check1">아이디 저장</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts"></script>
