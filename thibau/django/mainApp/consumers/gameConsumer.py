from    channels.generic.websocket import AsyncWebsocketConsumer
import  json

from    .gameConsumerUtils.classes.gameSettings import GameSettings
from 	.gameConsumerUtils.handlePaddleMove import handlePaddleMove
from	.gameConsumerUtils.handleInitGame import handleInitGame

gameSettingsInstances = {}

class GameConsumer(AsyncWebsocketConsumer):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.gameSettingsInstances = gameSettingsInstances

	async def connect(self):
		self.game_id = self.scope['url_route']['kwargs']['game_id']
		self.game_group_name = f'game_{self.game_id}'

		await self.channel_layer.group_add(
			self.game_group_name,
			self.channel_name
		)
		await self.accept()

	async def disconnect(self, close_code):
		await self.channel_layer.group_discard(
			self.game_group_name,
			self.channel_name
		)

	async def receive(self, text_data):
		gameID = self.scope['url_route']['kwargs']['game_id']
		message = json.loads(text_data)

		if (message['type'].startswith('init_')):
			await handleInitGame(self, gameID, message['type'], message['playerID'])

		if (message['type'] == 'paddle_move'):
			gameSettings = self.gameSettingsInstances[gameID]
			await handlePaddleMove(self, message, gameSettings, message['playerID'])

		if (message['type'] == 'reload_page'):
			await self.channel_layer.group_send(
				self.game_group_name,
				{
					'type': 'reload_page',
					'playerID': message['playerID']
				}
			)

	# Called by the server when a message is received from the group
	async def reload_page(self, event):
		message = json.dumps(event)
		await self.send(text_data=message)

	async def init_paddle_position(self, event):
		message = json.dumps(event)
		await self.send(text_data=message)

	async def update_score(self, event):
		message = json.dumps(event)
		await self.send(text_data=message)

	async def update_paddle_position(self, event):
		message = json.dumps(event)
		await self.send(text_data=message)

	async def update_ball_position(self, event):
		message = json.dumps(event)
		await self.send(text_data=message)

	async def game_over(self, event):
		message = json.dumps(event)
		await self.send(text_data=message)