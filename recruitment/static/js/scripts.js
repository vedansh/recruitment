var Recruiter = Backbone.Model.extend({
	defaults: {
		id : '',
		name: '',
		email: '',
	},
	idAttribute: "id",
});


var Recruiters = Backbone.Collection.extend({
	url: 'http://localhost:8000/recruiter'
});


var recruiters = new Recruiters();



var RecruiterView = Backbone.View.extend({
	model: new Recruiter(),
	tagName: 'tr',
	initialize: function() {
		this.template = _.template($('.recruiters-list-template').html());
	},
	events: {
		'click .edit-recruiter': 'edit',
		'click .update-recruiter': 'update',
		'click .cancel': 'cancel',
		'click .delete-recruiter': 'delete'
	},
	edit: function() {
		$('.edit-recruiter').hide();
		$('.delete-recruiter').hide();
		this.$('.update-recruiter').show();
		this.$('.cancel').show();

		var name = this.$('.name').html();
		var email = this.$('.email').html();

		this.$('.name').html('<input type="text" class="form-control name-update" value="' + name + '">');
		this.$('.email').html('<input type="text" class="form-control email-update" value="' + email + '">');
	},
	update: function() {
		this.model.set('name', $('.name-update').val());
		this.model.set('email', $('.email-update').val());

		this.model.save(null, {
			success: function(response) {
				console.log('Successfully UPDATED recruiter with _id: ' + response.toJSON()._id);
			},
			error: function(err) {
				console.log('Failed to update recruiter!');
			}
		})
	},
	cancel: function() {
		recruitersView.render();
	},
	delete: function() {
		this.model.destroy({
			type: 'DELETE',
			success: function(response) {
				console.log('Successfully DELETED recruiter with _id: ' + response.toJSON()._id);
			},
			error: function(err) {
				console.log('Failed to delete recruiter!');
			}
		});
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});


var RecruitersView = Backbone.View.extend({
	model: recruiters,
	el: $('.recruiters-list'),
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
					console.log('Successfully GOT recruiter with _id: ' + item._id);
				})
			},
			error: function() {
				console.log('Failed to get recruiters!');
			}
		});
	},
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(recruiter) {
			self.$el.append((new RecruiterView({model: recruiter})).render().$el);
		});
		return this;
	}
});

var recruitersView = new RecruitersView();

$(document).ready(function() {
	$('.add-recruiter').on('click', function() {
		var recruiter = new Recruiter({
			name: $('.namer-input').val(),
			email: $('.emailr-input').val(),
		});
		$('.namer-input').val('');
		$('.emailr-input').val('');
		recruiters.add(recruiter);
		recruiter.save(null, {
			type: 'POST',
			success: function(response) {
				console.log('Successfully SAVED recruiter with _id: ' + response.toJSON()._id);
			},
			error: function() {
				console.log('Failed to save recruiter!');
			}
		});
	});
})

