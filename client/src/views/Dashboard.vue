<template>
  <div class="container">
    <div class="row">
      
      <div class="col-sm-12 col-md-4 mb-4">
        <div class="card text-center">
          <div class="card-header bg-primary text-white">
            Question Asked
          </div>
          <div class="card-body text-center">
            <p class="card-text">View all list of owned question that has been asked in HacktivOverflow.</p>
            <router-link class="btn btn-outline-primary text-centers" to="/users/questions">View questions</router-link>
          </div>
        </div>
      </div>

      <div class="col-sm-12 col-md-4 mb-4">
        <div class="card text-center">
          <div class="card-header bg-info text-white">
            Question Answered
          </div>
          <div class="card-body text-center">
            <p class="card-text">View all list of question that has been answered by you in HacktivOverflow.</p>
            <router-link class="btn btn-outline-info text-centers" to="/users/answers">View answers</router-link>
          </div>
        </div>
      </div>

      <div class="col-sm-12 col-md-4 mb-4">
        <div class="card text-center">
          <div class="card-header bg-warning text-white">
            My vote
          </div>
          <div class="card-body text-center">
            <p class="card-text">View all list of your vote that has been posted in HacktivOverflow.</p>
            <a href="#" class="btn btn-outline-warning">View votes</a>
          </div>
        </div>
      </div>

      
    </div>
  </div>
</template>
