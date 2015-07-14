var Candidate = Backbone.Model.extend({
	defaults: {
		id : '',
		name: '',
		email: '',
		recruiter: ''
	},
	//urlRoot: 'http://localhost:8000/candidate/:id/',
	idAttribute: "id",
});


var Candidates = Backbone.Collection.extend({
	url: 'http://localhost:8000/candidate'
});


var candidates = new Candidates();



var CandidateView = Backbone.View.extend({
	model: new Candidate(),
	tagName: 'tr',
	initialize: function() {
		this.template = _.template($('.candidates-list-template').html());
	},
	events: {
		'click .edit-candidate': 'edit',
		'click .update-candidate': 'update',
		'click .cancel': 'cancel',
		'click .delete-candidate': 'delete'
	},
	edit: function() {
		$('.edit-candidate').hide();
		$('.delete-candidate').hide();
		this.$('.update-candidate').show();
		this.$('.cancel').show();

		var name = this.$('.name').html();
		var email = this.$('.email').html();
		var recruiter = this.$('.recruiter').html();

		this.$('.name').html('<input type="text" class="form-control name-update" value="' + name + '">');
		this.$('.email').html('<input type="text" class="form-control email-update" value="' + email + '">');
		this.$('.recruiter').html('<input type="text" class="form-control recruiter-update" value="' + recruiter + '">');
	},
	update: function() {
		this.model.set('name', $('.name-update').val());
		this.model.set('email', $('.email-update').val());
		this.model.set('recruiter', $('.recruiter-update').val());

		this.model.save(null, {
			success: function(response) {
				console.log('Successfully UPDATED candidate with _id: ' + response.toJSON()._id);
			},
			error: function(err) {
				console.log('Failed to update candidate!');
			}
		})
	},
	cancel: function() {
		candidatesView.render();
	},
	delete: function() {
		this.model.destroy({
			type: 'DELETE',
			success: function(response) {
				console.log('Successfully DELETED candidate with _id: ' + response.toJSON()._id);
			},
			error: function(err) {
				console.log('Failed to delete candidate!');
			}
		});
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});


var CandidatesView = Backbone.View.extend({
	model: candidates,
	el: $('.candidates-list'),
	initialize: function() {
		var self = this;
		this.model.on('add', this.render, this);
		this.model.on('change', function() {
			setTimeout(function() {
				self.render();
			}, 30);
		},this);
		this.model.on('remove', this.render, this);

		this.model.fetch({
			success: function(response) {
				_.each(response.toJSON(), function(item) {
					console.log('Successfully GOT candidate with _id: ' + item._id);
				})
			},
			error: function() {
				console.log('Failed to get candidates!');
			}
		});
	},
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(candidate) {
			self.$el.append((new CandidateView({model: candidate})).render().$el);
		});
		return this;
	}
});

var candidatesView = new CandidatesView();

$(document).ready(function() {
	$('.add-candidate').on('click', function() {
		var candidate = new Candidate({
			name: $('.name-input').val(),
			email: $('.email-input').val(),
			recruiter: $('.recruiter-input').val()
		});
		$('.name-input').val('');
		$('.email-input').val('');
		$('.recruiter-input').val('');
		candidates.add(candidate);
		candidate.save(null, {
			type: 'POST',
			success: function(response) {
				console.log('Successfully SAVED candidate with _id: ' + response.toJSON()._id);
			},
			error: function() {
				console.log('Failed to save candidate!');
			}
		});
	});
})

